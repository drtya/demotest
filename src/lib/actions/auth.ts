'use server';
import prisma from '../db';
import { compairPassword, hashPassword } from '../utils/bcrypt';
import { cookies } from 'next/headers';
import { createToken } from '../utils/jwt';
import { redirect } from 'next/navigation';

const signIn = async (formData: FormData) => {
  const user = await prisma.user.findUnique({
    where: {
      email: formData.get('email') as string,
    },
  });
  if (!user) {
    console.log('пользователь с таким email не найден!');
    return;
  }
  const passwordVAlidation = await compairPassword(
    formData.get('password') as string,
    user?.password
  );

  if (!passwordVAlidation) {
    console.log('пользователь ввел неверный пароль!');
    return;
  }
  const jwtPayload = await createToken(user);
  cookies().set('token', jwtPayload);
  redirect('/profile');
};

const register = async (formData: FormData) => {
  const user = await prisma.user.create({
    data: {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      login: formData.get('login') as string,
      password: await hashPassword(formData.get('password') as string),
    },
  });
  const jwtPayload = await createToken(user);
  cookies().set('token', jwtPayload);
  redirect('/profile');
};
const logout = async () => {
  cookies().delete('token');
  redirect('/auth');
};

export { signIn, register, logout };
