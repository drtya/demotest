import { JWTPayload } from 'jose';

export interface IUser {
  uuid: string;
  email: string;
  fullName: string;
  password?: string;
  photo?: string;
  phone?: string;
}
export interface UserJWT extends JWTPayload, IUser {}
