import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/utils/jwt';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const AuthPage = req.nextUrl.pathname === '/auth';

  if (!token && !AuthPage) {
    return NextResponse.redirect(new URL(`/auth`, req.url));
  }
  try {
    if (token) {
      const decoded = await verifyToken(token);
      const isTokenExpired = (decoded.exp as number) * 1000 < Date.now();
      if (isTokenExpired) {
        const response = NextResponse.redirect(new URL(`/auth`, req.url));
        response.cookies.delete('token');
        return response;
      }

      if (AuthPage && decoded) {
        return NextResponse.redirect(new URL(`/profile`, req.url));
      }
    }
  } catch (error) {
    console.error(error);
    if (!AuthPage) {
      const response = NextResponse.redirect(new URL(`/auth`, req.url));
      response.cookies.delete('token');
      return response;
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
