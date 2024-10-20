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
import { HeaderNavbar } from '@/components/shared/header/ui/headerNavigation';
import { useVehicleStore } from '@/store/vehicle';

const GeneratePageTitle = () => {
  const { vehiclesCount } = useVehicleStore();
  console.log(vehiclesCount);
  
  const MNav = useTranslations('Navbar');
  const MProfile = useTranslations('Profile');
  const pathname = usePathname();
  const { autoUUID } = useParams<{ autoUUID: string }>();
  const getPageTitle: JSX.Element = useMemo(() => {
    if (pathname.startsWith('/profile')) {
      return (
        <Header
          nav={
            <HeaderNavbar
              items={[
                {
                  linkName: MProfile('profile'),
                  path: '/profile',
                },
                {
                  linkName: MProfile('staff'),
                  path: '/profile/staff',
                },
              ]}
            />
          }
        >
          <HeaderTitle text={MNav('profile')} />
        </Header>
      );
    } else if (pathname.startsWith('/setting')) {
      return (
        <Header>
          <HeaderTitle text={MNav('setting')} />
        </Header>
      );
    } else if (pathname.startsWith('/vehicles/new')) {
      return (
        <Header>
          <div className="flex items-center gap-custom16">
            <HeaderBack />
            <HeaderTitle text={MNav('vehicles')} />
          </div>
        </Header>
      );
    } else if (pathname.startsWith(`/vehicles/${autoUUID}`)) {
      return (
        <Header>
          <div className="flex items-center gap-custom16">
            <HeaderBack />
            <div className="space-y-custom10 w-custom200">
              <EditableHeaderTitle text={autoUUID} />
              <EditableHeaderDescription text="description" />
            </div>
          </div>
        </Header>
      );
    } else if (pathname.startsWith('/vehicles')) {
      return (
        <Header>
          <div className="flex items-center gap-custom16">
            <HeaderTitle text={MNav('vehicles')} />
            <CardInfo variant="amount" amount={vehiclesCount}>
              {vehiclesCount}
            </CardInfo>
          </div>
        </Header>
      );
    } else return <Header />;
  }, [pathname, vehiclesCount, autoUUID]);

  return getPageTitle;
};

export default GeneratePageTitle;
