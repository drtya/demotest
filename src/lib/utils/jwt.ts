import { jwtVerify, SignJWT } from 'jose';
import { jwtDecode } from 'jwt-decode';
import { UserJWT } from '../types/user';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function createToken(payload:any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h') 
    .sign(SECRET); 
  return token;
}


export async function verifyToken(token: string) {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      return payload;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
  

  export const decodeToken = (token: string) => {
    try {
      const decoded = jwtDecode<UserJWT>(token);
      return decoded;
    } catch (error) {
      return null;
    }
  };