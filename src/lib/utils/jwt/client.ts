'use client'
import { UserJWT } from "@/lib/types/user";
import { jwtDecode } from "jwt-decode";


export const decodeToken = (token: string) => {
    try {
      const decoded = jwtDecode<UserJWT>(token);
      return decoded;
    } catch (error) {
      console.error(error)
      return null;
    }
  };