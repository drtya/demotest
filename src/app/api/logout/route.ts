import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    cookies().delete('token');
    return new Response(JSON.stringify('Вы вышли с аккаунта'), {
      status: 500,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Что-то пошло не так..' }), {
      status: 500,
    });
  }
}
