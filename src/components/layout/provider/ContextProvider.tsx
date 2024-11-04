'use client';
import { UserDetailContext } from '@/app/_context/userDetailContext';
import { IUser } from '@/lib/types/user';
import React, { ReactNode, useEffect, useState } from 'react';
import { decodeToken } from '@/lib/utils/jwt/client';
import Cookies from 'js-cookie';
import axios from 'axios';

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const userUUID = Cookies.get('token');
  const [userDetail, setUserDetail] = useState<IUser | null>(null);
  useEffect(() => {
    const user = axios.get(
      `/api/profile/${decodeToken(userUUID as string)?.uuid as string}`
    );
    user.then(({ data }) => setUserDetail(data));
  }, [userUUID]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
};

export default ContextProvider;
