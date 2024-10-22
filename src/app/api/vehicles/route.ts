import prisma from '@/lib/db';
import { IVehicle } from '@/lib/types/vehicle';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  const skip = (page - 1) * limit;

  try {
    const vehicle:IVehicle[] = await prisma.vehicle.findMany({
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
    const totalCount:number = await prisma.vehicle.count({
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
    return new Response(JSON.stringify({vehicle,totalPages}), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch cars' }), {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

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
