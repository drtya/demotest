'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import LocaleSwitch from '../../locale/localeSwitch';
import LogoutButton from './logoutButton';
import { getCookie } from 'cookies-next';
import { decodeToken } from '@/lib/utils/jwt';
import { UserJWT } from '@/lib/types/user';


const HeaderProfile = () => {
  const [user, setUser] = useState<UserJWT | null>(null);
  const token = getCookie('token');
  useEffect(() => {
    setUser(decodeToken(token as string))
  }, []);
  return (
    <div className="flex items-center gap-custom32 text-black">
      {user ? (
        <div className="flex items-center gap-custom10 ">
          <Image
            src={user.photo || '/profilePhoto.png'}
            width={50}
            height={50}
            alt="photo"
          />
          <p className="font-medium text-size15">{user.fullName}</p>
        </div>
      ) : null}
      <LocaleSwitch />
      {user ? <LogoutButton /> : null}
    </div>
  );
};

export default HeaderProfile;
