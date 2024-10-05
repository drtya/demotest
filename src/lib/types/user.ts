import { JWTPayload } from "jose";

export interface UserJWT extends JWTPayload {
  uuid: string;
  login: string;
  email: string;
  fullName: string;
  password: string;
  photo?: string;
}