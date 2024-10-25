'use client';
import Image from 'next/image';
import LocaleSwitch from '../../locale/localeSwitch';
import LogoutButton from './logoutButton';
import BurgerButton from './burgerButton';
import noImg from '@/../public/no-img.svg';
import { useGetUserData } from '@/lib/hooks/use.userData';

const HeaderProfile = ({ className }: { className?: string }) => {
  const { data: user, isLoading, error } = useGetUserData();
  console.log('user',user);
  
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
            src={user.photo || noImg}
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
