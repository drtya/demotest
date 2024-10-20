'use client';
import { usePathname } from 'next/navigation';
import { IMenuLink } from '../types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const NavLink = ({ li }: { li: IMenuLink }) => {
  const MNavbar = useTranslations('Navbar');
  const pathname = usePathname();
//   const replaceHandler = (li: IMenuLink) => {
//     if (pathname.includes(li.href)) {
//       return;
//     }
//     push(li.href);
//   };
  return (
    <li>
      <Link
        href={li.href}
        className={`w-full relative before:absolute before:h-full before:t-0 before:left-0 text-start p-menuList text-size16 border-primary before:duration-300 duration-300 font-medium flex items-center gap-custom20 ${
          pathname.startsWith(li.href)
            ? 'before:bg-white-20 before:w-full text-white border-l cursor-default'
            : 'text-white-45 before:w-0 border-none'
        }`}
      >
        <div className="menuIconSize text-white-45">{li.icon}</div>
        <div className="text-size16">{MNavbar(li.title)}</div>
      </Link>
    </li>
  );
};

export default NavLink;
