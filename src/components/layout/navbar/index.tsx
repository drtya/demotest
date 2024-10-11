'use client';
import BurgerButton from '@/components/shared/header/ui/burgerButton';
import HeaderProfile from '@/components/shared/header/ui/headerProfile';
import { useBurgerMenu } from '@/store/burger';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

interface IMenuLink {
  href: string;
  icon: JSX.Element;
  title: string;
}

const Navbar = ({
  navLinks,
  className,
}: {
  navLinks: IMenuLink[];
  className?: string;
}) => {
  const t = useTranslations('Navbar');
  const { replace } = useRouter();
  const isOpen = useBurgerMenu((store) => store.isOpen);
  const pathname = usePathname();
  const replaceHandler = (li: IMenuLink) => {
    if (pathname.includes(li.href)) {
      return;
    }
    replace(li.href);
  };
  return (
    <div
      className={`h-screen menuImage pt-custom32 bg-menuColor flex flex-col w-navbar overflow-hidden duration-200 ${
        isOpen ? 'max-mobile360:w-full' : 'max-sm:w-0'
      } ${className}`}
    >
      <div className="flex items-start sm:items-center sm:justify-center mb-custom40 justify-between p-custom20">
        <h3 className="text-white">{t('logo')}</h3>
        <BurgerButton className="mobile360:hidden" colorClass="bg-white" />
      </div>
      <nav className="flex flex-col justify-between h-full">
        <ol className="space-y-custom10">
          {navLinks.map((li) => (
            <li key={`navbar_${li.title}`}>
              <button
                className={`w-full relative before:absolute before:h-full before:t-0 before:left-0 text-start p-menuList text-size16 border-primary before:duration-300 duration-300 font-medium flex items-center gap-custom20 ${
                  pathname.startsWith(li.href)
                    ? 'before:bg-white-20 before:w-full text-white border-l cursor-default'
                    : 'text-white-45 before:w-0 border-none'
                }`}
                onClick={() => replaceHandler(li)}
              >
                <div className="menuIconSize text-white-45">{li.icon}</div>
                <div className="text-size16">{t(li.title)}</div>
              </button>
            </li>
          ))}
        </ol>
        <div className='pb-custom40 sm:hidden'>
          <HeaderProfile className="flex-col text-white-60" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
