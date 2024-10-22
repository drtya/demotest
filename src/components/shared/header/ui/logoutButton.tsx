'use client';
import { Button } from '@/components/ui/button';
import { useLogoutMutation } from '@/services/profile';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';

const LogoutButton = () => {
  const { push } = useRouter();
  const t = useTranslations('Auth');
  const [logout, { isLoading, error }] = useLogoutMutation();
  const logoutHandler = async () => {
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
