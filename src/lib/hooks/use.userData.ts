'use client'
import { useGetProfileByIdQuery } from '@/services/profile';
import { decodeToken } from '../utils/jwt/client';
import Cookies from 'js-cookie';

export const useGetUserData = () => {
  const userUUID = Cookies.get('token');
  const { data, isLoading, error } = useGetProfileByIdQuery(
    decodeToken(userUUID as string)?.uuid as string
  );

  return { data, isLoading, error };
};
