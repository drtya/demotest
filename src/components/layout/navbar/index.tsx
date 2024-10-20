import BurgerButton from '@/components/shared/header/ui/burgerButton';
import HeaderProfile from '@/components/shared/header/ui/headerProfile';
import { useTranslations } from 'next-intl';
import { IMenuLink } from './types';
import NavLink from './ui/navLink';
import NavbarOverlay from './ui/navbarOverlay';

const Navbar = ({
  navLinks,
  className,
}: {
  navLinks: IMenuLink[];
  className?: string;
}) => {
  const MNavbar = useTranslations('Navbar');
  return (
    <NavbarOverlay className={className}>
      <div className="flex items-start sm:items-center sm:justify-center mb-custom40 justify-between p-custom20">
        <h3 className="text-white">{MNavbar('logo')}</h3>
        <BurgerButton className="mobile360:hidden" colorClass="bg-white" />
      </div>
      <nav className="flex flex-col justify-between h-full">
        <ol className="space-y-custom10">
          {navLinks.map((li) => (
            <NavLink key={`navbar_${li.title}`} li={li}/>
          ))}
        </ol>
        <div className='pb-custom40 sm:hidden'>
          <HeaderProfile className="flex-col text-white-60" />
        </div>
      </nav>
    </NavbarOverlay>
  );
};

export default Navbar;
