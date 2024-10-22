import prisma from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    let imageUrl;
    let result;
    let user = await prisma.user.findUnique({
      where: {
        uuid: id,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({
          error: 'Пользователь не найден!',
        }),
        {
          status: 401,
        }
      );
    }
    result = user;
    if (user.photo) {
      const base64Image = Buffer.from(user.photo).toString('base64');
      imageUrl = `data:image/jpeg;base64,${base64Image}`;
      result = { ...result, photo: imageUrl };
    }

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
