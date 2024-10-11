'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LocaleSwitch from '../../locale/localeSwitch';
import LogoutButton from './logoutButton';
import { getCookie } from 'cookies-next';
import { decodeToken } from '@/lib/utils/jwt';
import { UserJWT } from '@/lib/types/user';
import BurgerButton from './burgerButton';

const HeaderProfile = ({ className }: { className?: string }) => {
  const [user, setUser] = useState<UserJWT | null>(null);
  const token = getCookie('token');
  useEffect(() => {
    setUser(decodeToken(token as string));
  }, []);
  return user ? (
    <>
      <div
        className={`flex items-center gap-custom16 ${className}`}
      >
        <div className="flex items-center gap-custom10">
          <Image
            src={user.photo || '/profilePhoto.png'}
            width={50}
            height={50}
            alt="photo"
          />
          <p className="font-medium text-size15">{user.fullName}</p>
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
