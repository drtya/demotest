'use client';
import React, { useMemo } from 'react';
import AuthHeader from '../authHeader';
import { usePathname } from '@/i18n/config';
import { useTranslations } from 'next-intl';

type Props = {
  children: React.ReactNode;
  amount?: number;
  description?: string;
  backBtn?: boolean;
};

const PageLayout = React.memo(
  ({ children, amount, description, backBtn }: Props) => {
    const t = useTranslations('Navbar');
    const pathname = usePathname();
    const getPageTitle :string= useMemo(() => {
      switch (pathname) {
        case '/profile':
          return t('profile');
        case '/setting':
          return t('setting');
        case '/vehicles':
          return t('vehicles');
        default:
          return 'Мой сайт';
      }
    }, [t]);
    return (
      <div className="flex-1 flex flex-col">
        <AuthHeader title={getPageTitle} />
        <div className="p-mainLayout flex-1">{children}</div>
      </div>
    );
  }
);

export default PageLayout;
