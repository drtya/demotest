'use server';
import prisma from '../db';
import { compairPassword, hashPassword } from '../utils/bcrypt';
import { cookies } from 'next/headers';
import { createToken, decodeToken } from '../utils/jwt';
import { redirect } from 'next/navigation';

export interface IAuthResonse {
  success: boolean;
  message: string;
}

const signIn = async (formData: FormData): Promise<void | string> => {
  const user = await prisma.user.findUnique({
    where: {
      email: formData.get('email') as string,
    },
  });

  if (!user) {
    return 'Пользователь ввел неверный email или пароль!';
  }
  const passwordValidation = await compairPassword(
    formData.get('password') as string,
    user?.password
  );

  if (!passwordValidation) {
    return 'Пользователь ввел неверный email или пароль!';
  }
  const jwtPayload = await createToken(user);
  cookies().set('token', jwtPayload);
  redirect('/profile');
};

const register = async (formData: FormData): Promise<void | string> => {
  try {
    const user = await prisma.user.create({
      data: {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        password: await hashPassword(formData.get('password') as string),
      },
    });
    const jwtPayload = await createToken(user);
    cookies().set('token', jwtPayload);
    redirect('/profile');
  } catch (error: any) {
    return 'Пользователь с таким email или логином уже существует';
  }
};

const logout = async () => {
  cookies().delete('token');
  redirect('/auth');
};

const editProfile = async (formData: FormData) => {
  try {
    const newPass = formData.get('newPassword') as string;
    const session = decodeToken(cookies().get('token')?.value as string);
    const user = await prisma.user.update({
      where: {
        uuid: session?.uuid,
      },
      data: {
        fullName: formData.get('fullName') as string,
        email: formData.get('email') as string,
        phone: (formData.get('phone') as string) ?? '',
        password: newPass ? await hashPassword(newPass) : session?.password,
      },
    });
    const jwtPayload = await createToken(user);
    cookies().set('token', jwtPayload);
  } catch (error) {
    console.log(error);
  }
};

export { signIn, register, logout, editProfile };
