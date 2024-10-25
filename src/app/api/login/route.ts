import prisma from '@/lib/db';
import { compairPassword } from '@/lib/utils/bcrypt';
import { cookies } from 'next/headers';
import { createToken } from '@/lib/utils/jwt/server';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    let imageUrl;

    let user = await prisma.user.findUnique({
      where: {
        email: formData.get('email') as string,
      },
    });

    if (!user) {
      return new Response(
        JSON.stringify({
          error: 'Пользователь ввел неверный email или пароль!',
        }),
        {
          status: 401,
        }
      );
    }
    const passwordValidation = await compairPassword(
      formData.get('password') as string,
      user?.password
    );

    if (!passwordValidation) {
      return new Response(
        JSON.stringify({
          error: 'Пользователь ввел неверный email или пароль!',
        }),
        {
          status: 411,
        }
      );
    }
    if (user.photo) {
      const base64Image = Buffer.from(user.photo).toString('base64');
      imageUrl = `data:image/jpeg;base64,${base64Image}`;
    }

    const jwtPayload = await createToken({ uuid: user.uuid });
    cookies().set('token', jwtPayload);
    return new Response(JSON.stringify('Пользователь авторизован'), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
