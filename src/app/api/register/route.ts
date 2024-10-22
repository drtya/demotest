import prisma from '@/lib/db';
import { hashPassword } from '@/lib/utils/bcrypt';
import { cookies } from 'next/headers';
import { createToken } from '@/lib/utils/jwt';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const user = await prisma.user.create({
      data: {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        password: await hashPassword(formData.get('password') as string),
      },
    });

    const jwtPayload = await createToken({ uuid: user.uuid });
    cookies().set('token', jwtPayload);
    return new Response(JSON.stringify('Пользователь зарегистрировался'), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Пользователь с таким email или логином уже существует!' }), {
      status: 500,
    });
  }
}
