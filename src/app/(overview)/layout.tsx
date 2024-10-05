import Navbar from '@/components/layout/navbar';
import PageLayout from '@/components/layout/pageLayout';
import {
  Cog6ToothIcon,
  CubeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations('Navbar');
  return (
    <div className="flex">
      <Navbar navLinks={[
    {
      href: '/profile',
      icon: <UserCircleIcon />,
      title: t('profile'),
    },
    {
      href: '/vehicles',
      icon: <CubeIcon />,
      title: t('vehicles'),
    },
    {
      href: '/setting',
      icon: <Cog6ToothIcon />,
      title: t('setting'),
    },
  ]} />
      <PageLayout>
      {children}
    </PageLayout>
    </div>
  );
}
