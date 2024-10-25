import prisma from '@/lib/db';
import { decodeToken } from '@/lib/utils/jwt/server';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  const skip = (page - 1) * limit;

  try {
    const user =await decodeToken(cookies().get('token')?.value as string);

    const vehicles = await prisma.vehicle.findMany({
      include: {
        author: true,
      },
      where: {
        OR: [
          {
            model: { startsWith: searchQuery },
          },
          {
            make: { startsWith: searchQuery },
          },
          {
            vin: { startsWith: searchQuery },
          },
        ],
      },
      skip,
      take: limit,
    });

    const vehiclesWithOwnershipFlag = vehicles.map((vehicle) => {
      let imageUrl = null;
      if (vehicle.image) {
        const base64Image = Buffer.from(vehicle.image).toString('base64');
        imageUrl = `data:image/jpeg;base64,${base64Image}`;
      }
      return {
        ...vehicle,
        image: imageUrl,
        isCreatedByUser: vehicle.authorId === user?.uuid, // Флаг для автомобилей, созданных текущим пользователем
      };
    });
    const totalCount: number = await prisma.vehicle.count({
      where: {
        OR: [
          {
            model: { startsWith: searchQuery },
          },
          {
            make: { startsWith: searchQuery },
          },
          {
            vin: { startsWith: searchQuery },
          },
        ],
      },
    });

    const totalPages = Math.ceil(totalCount / limit);
    return new Response(
      JSON.stringify({ vehiclesWithOwnershipFlag, totalPages }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch cars' }), {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  const user =await decodeToken(cookies().get('token')?.value as string);
  const formData = await request.formData();
  let imageUrl = null;
  const file = formData.get('image') as File | null;
  if (file?.size) {
    const arrayBuffer = await file.arrayBuffer();
    imageUrl = Buffer.from(arrayBuffer);
  }
  const createSlug = `${(formData.get('make') as string)
    .replace(/\s+/g, '-')
    .toLowerCase()}-${(formData.get('model') as string)
    .replace(/\s+/g, '-')
    .toLowerCase()}`;

  try {
    const newVehicle = await prisma.vehicle.create({
      data: {
        vin: formData.get('vin') as string,
        slug: createSlug,
        make: formData.get('make') as string,
        model: formData.get('model') as string,
        authorId: user?.uuid!,
        image: imageUrl,
        bodyType: (formData.get('bodyType') as string) ?? null,
        fuelType: (formData.get('fuelType') as string) ?? null,
        maxAmount: Number(formData.get('maxAmount') as string) ?? null,
        horsePower: Number(formData.get('horsePower') as string) ?? null,
        description: (formData.get('description') as string) ?? null,
      },
    });
    return new Response(JSON.stringify(newVehicle), { status: 201 });
  } catch (error: any) {
    console.error('Error creating vehicle:', error); // Логируем ошибку на сервере

    // Если ошибка связана с уникальностью или валидацией
    if (error.code === 'P2002') {
      return new Response(JSON.stringify({ error: 'VIN already exists' }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ error: 'Failed to create car' }), {
      status: 500,
    });
  }
}
