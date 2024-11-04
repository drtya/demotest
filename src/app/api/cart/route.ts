import prisma from '@/lib/db';
import { decodeToken } from '@/lib/utils/jwt/server';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// export async function GET(req: NextRequest) {
// try {
//     const user = await decodeToken(cookies().get('token')?.value as string);
//     const allVehicles = await prisma.cart.findMany({
//       where: {
//         userId: user?.uuid,
//       },
//     });
//     return new Response(JSON.stringify({ result: allVehicles }), {
//         status: 200,
//       });
// } catch (error) {

// }

// }
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  const skip = (page - 1) * limit;

  try {
    const user = await decodeToken(cookies().get('token')?.value as string);

    const vehicles = await prisma.cart.findMany({
      include: {
        vehicle: true,
        user: true,
      },
      where: {
        userId: user?.uuid,
        OR: [
          {
            vehicle: { model: { startsWith: searchQuery } },
          },
          {
            vehicle: { make: { startsWith: searchQuery } },
          },
          {
            vehicle: { vin: { startsWith: searchQuery } },
          },
        ],
      },

      skip,
      take: limit,
    });
    const vehiclesList = vehicles.map((cartItem) => {
      const vehicle = cartItem.vehicle;

      let imageUrl = null;
      if (vehicle.image) {
        const base64Image = Buffer.from(vehicle.image).toString('base64');
        imageUrl = `data:image/jpeg;base64,${base64Image}`;
      }
      return {
        ...vehicle,
        image: imageUrl,
      };
    });

    const totalCount: number = await prisma.cart.count({
      where: {
        userId: user?.uuid,
        OR: [
          {
            vehicle: { model: { startsWith: searchQuery } },
          },
          {
            vehicle: { make: { startsWith: searchQuery } },
          },
          {
            vehicle: { vin: { startsWith: searchQuery } },
          },
        ],
      },
    });

    const totalPages = Math.ceil(totalCount / limit);
    return new Response(
      JSON.stringify({ vehicles: vehiclesList, totalPages }),
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
