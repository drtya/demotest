'use client';
import { Button } from '@/components/ui/button';
import { useLogoutMutation } from '@/services/profile';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { vehiclesApi } from '@/services/vehicles';
import { useAppDispatch } from '@/store/hooks';
import { UserDetailContext } from '@/app/_context/userDetailContext';

const LogoutButton = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const t = useTranslations('Auth');
  const [logout, { isLoading, error }] = useLogoutMutation();
  const logoutHandler = async () => {
    setUserDetail(null)
    dispatch(vehiclesApi.util.resetApiState());
    await logout();
    if (!error) push('/auth');
  };
  return (
    <Button type="submit" onClick={logoutHandler} disabled={isLoading}>
      {t('logout')}
    </Button>
  );
};

export default LogoutButton;
