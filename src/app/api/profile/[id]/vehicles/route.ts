import prisma from '@/lib/db';
import { decodeToken } from '@/lib/utils/jwt/server';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  const skip = (page - 1) * limit;
    
  try {
    const user = await decodeToken(cookies().get('token')?.value as string);

    const vehicles = await prisma.vehicle.findMany({
      include: {
        author: true,
      },
      where: {
        authorId: user?.uuid,
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
        AND: {
          authorId: id,
        },
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
