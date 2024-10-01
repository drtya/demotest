'use client';
import { useState } from 'react';
import {
  Cog6ToothIcon,
  CubeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/config';

interface IMenuLink {
  href: string;
  icon: JSX.Element;
  title: string;
}

const Navbar = () => {
  const t = useTranslations('Navbar');
  const [navLinks] = useState([
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
  ]);
  const { replace } = useRouter();
  const pathname = usePathname();
  const replaceHandler = (li: IMenuLink) => {
    if (pathname.includes(li.href)) {
      return;
    }
    replace(li.href);
  };
  return (
    <div className="h-screen menuImage pt-custom32 bg-menuColor w-navbar">
      <h3 className="text-white text-center mb-custom80 -ml-10">{t('logo')}</h3>
      <nav>
        <ol className="space-y-custom10">
          {navLinks.map((li, idx) => (
            <li key={`navbar_${li.title}`}>
              <button
                className={`w-full relative before:absolute before:h-full before:t-0 before:left-0 text-start p-menuList text-size16 border-primary before:duration-300 duration-300 font-medium flex items-center gap-custom20 ${
                  pathname === li.href
                    ? 'before:bg-white-20 before:w-full text-white border-l cursor-default'
                    : 'text-white-45 before:w-0 border-none'
                }`}
                onClick={() => replaceHandler(li)}
              >
                <div className="menuIconSize text-white-45">{li.icon}</div>
                <div className="text-size16">{li.title}</div>
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Navbar;
