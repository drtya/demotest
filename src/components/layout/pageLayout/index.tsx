'use client';
import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Header, HeaderBack, HeaderTitle } from '@/components/shared/header';
import { CardInfo } from '@/components/ui/cardInfoplate';
import { useParams } from 'next/navigation';
import {
  EditableHeaderDescription,
  EditableHeaderTitle,
} from '@/components/shared/header/ui/editableHeader';
import { getCookie } from 'cookies-next';

type Props = {
  children: React.ReactNode;
};

const PageLayout = React.memo(({ children }: Props) => {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const { autoUUID } = useParams<{ autoUUID: string }>();
  
  const getPageTitle: JSX.Element | null = useMemo(() => {
    switch (pathname) {
      case '/profile':
        return <HeaderTitle text={t('profile')} />;
      case '/setting':
        return <HeaderTitle text={t('setting')} />;
      case '/vehicles':
        return (
          <div className="flex items-center gap-custom16">
            <HeaderTitle text={t('vehicles')} />
            <CardInfo variant="amount" amount={211}>
              211
            </CardInfo>
          </div>
        );
      case '/vehicles/new':
        return (
          <div className="flex items-center gap-custom16">
            <HeaderBack />
            <HeaderTitle text={t('vehicles')} />
          </div>
        );
      case `/vehicles/${autoUUID}`:
        return (
          <div className="flex items-center gap-custom16">
            <HeaderBack />
            <div className='space-y-custom10 w-custom200'>
              <EditableHeaderTitle text={autoUUID} />
              <EditableHeaderDescription text="description" />
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [pathname]);
  return (
    <div className="flex-1 flex flex-col">
      <Header>{getPageTitle}</Header>
      <div className="p-mainLayout flex-1">{children}</div>
    </div>
  );
});

export default PageLayout;
