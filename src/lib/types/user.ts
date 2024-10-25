import { JWTPayload } from 'jose';

export interface IProfile {
  uuid: string;
  email: string;
  fullName: string;
  password?: string;
  photo?: string;
  phone?: string;
}
export interface UserJWT extends JWTPayload, IProfile {}
