'use client'
import { Button } from '@/components/ui/button';
import { logout } from '@/lib/actions/auth';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {};

const LogoutButton = (props: Props) => {
  const t = useTranslations('Auth');
  const logoutHandler = async() => {
    await logout()
  };
  return (
      <Button type="submit" onClick={logoutHandler}>{t('logout')}</Button>
  );
};

export default LogoutButton;
