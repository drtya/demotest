import { IMenuLink } from '@/components/layout/navbar/types';
import {
  Cog6ToothIcon,
  CubeIcon,
  UserCircleIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/solid';

export const navMenu: IMenuLink[] = [
  {
    href: '/profile',
    icon: <UserCircleIcon />,
    title: 'profile',
  },
  {
    href: '/vehicles',
    icon: <CubeIcon />,
    title: 'vehicles',
  },
  {
    href: '/my-vehicles',
    icon: <ComputerDesktopIcon />,
    title: 'myVehicles',
  },
  {
    href: '/setting',
    icon: <Cog6ToothIcon />,
    title: 'setting',
  },
];
