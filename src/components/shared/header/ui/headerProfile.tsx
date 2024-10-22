'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LocaleSwitch from '../../locale/localeSwitch';
import LogoutButton from './logoutButton';
import { getCookie } from 'cookies-next';
import { decodeToken } from '@/lib/utils/jwt';
import BurgerButton from './burgerButton';
import { useGetProfileByIdQuery } from '@/services/profile';

const HeaderProfile = ({ className }: { className?: string }) => {
  const [token, setToken] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const { data, isLoading, error } = useGetProfileByIdQuery(
    decodeToken(token as string)?.uuid as string
  );
  useEffect(() => {
    setToken(getCookie('token'));
  }, []);
  useEffect(() => {
    setUser(data);
  }, [data]);
  if (isLoading) {
    <div>Loading...</div>;
  }
  return user ? (
    <>
      <div className={`flex items-center gap-custom16 ${className}`}>
        <div className="flex items-center gap-custom10">
          <Image
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '100%',
              objectFit: 'cover',
            }}
            src={user.photo || '/profilePhoto.png'}
            width={50}
            height={50}
            alt="photo"
          />
          <p className="font-medium text-size20">{user.fullName}</p>
        </div>
        <LocaleSwitch />
        <LogoutButton />
      </div>
      <BurgerButton className="sm:hidden" />
    </>
  ) : (
    <LocaleSwitch />
  );
};

export default HeaderProfile;
