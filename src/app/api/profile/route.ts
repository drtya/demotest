import prisma from '@/lib/db';
import { hashPassword } from '@/lib/utils/bcrypt';
import { cookies } from 'next/headers';
import { createToken, decodeToken } from '@/lib/utils/jwt';

export async function POST(req: Request) {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    const session = decodeToken(token as string);
    const formData = await req.formData();
    const newPass = formData.get('newPassword') as string;
    let imageUrl;
    const file = formData.get('photo') as File;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const updatedUser = await prisma.user.update({
      where: {
        uuid: session?.uuid,
      },
      data: {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        phone: (formData.get('phone') as string) ?? '',
        password: newPass ? await hashPassword(newPass) : session?.password,
        photo: buffer,
      },
    });
    if (updatedUser.photo) {
      const base64Image = Buffer.from(updatedUser.photo).toString('base64');
      imageUrl = `data:image/jpeg;base64,${base64Image}`;
    }

    const jwtPayload = await createToken({
      ...updatedUser,
      photo: imageUrl || null,
    });
    cookies().set('token', jwtPayload);
    return new Response(JSON.stringify('Пользователь обновлен!'), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
