'use client';
import Image from 'next/image';
import LocaleSwitch from '../../locale/localeSwitch';
import LogoutButton from './logoutButton';
import BurgerButton from './burgerButton';
import noImg from '@/../public/no-img.svg';
import { useContext } from 'react';
import { UserDetailContext } from '@/app/_context/userDetailContext';

const HeaderProfile = ({ className }: { className?: string }) => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return userDetail ? (
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
            src={userDetail.photo || noImg}
            width={50}
            height={50}
            alt="photo"
          />
          <p className="font-medium text-size20">{userDetail.fullName}</p>
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
