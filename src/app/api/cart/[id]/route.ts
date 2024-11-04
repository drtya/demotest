import { NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { decodeToken } from '@/lib/utils/jwt/server';
import { cookies } from 'next/headers';
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await decodeToken(cookies().get('token')?.value as string);
    const { id } = params;
    const addedVehicle = await prisma.cart.create({
      data: {
        vehicleId: id,
        userId: user?.uuid as string,
      },
    });
    return new Response(JSON.stringify('Авто добавлено в избранное'), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({ error: 'Failed to add car in cart' }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const existingCartItem = await prisma.cart.delete({
      where: { vehicleId: id },
    });
    return new Response(JSON.stringify('Авто удалено с избранного'), {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({ error: 'Failed to delete car in cart' }),
      {
        status: 500,
      }
    );
  }
}
