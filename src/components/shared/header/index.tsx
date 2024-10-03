import React from 'react';
import LocaleSwitch from '../locale/localeSwitch';
import Image from 'next/image';
import BackPageButton from './button/back';
import { Link } from '@/i18n/config';

export interface IEditableHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  text?: string;
}

const Header = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <header
      className="p-headerAuth flex items-center justify-between z-50"
      ref={ref}
      {...props}
    >
      {children}
      <div className="flex items-center gap-custom32">
        <div className="flex items-center gap-custom10">
          <Image src={'/profilePhoto.png'} width={50} height={50} alt="photo" />
          <p className="font-medium text-size15">John Doe</p>
        </div>
        <LocaleSwitch />
      </div>
    </header>
  )
);

const HeaderTitle = React.forwardRef<HTMLDivElement, IEditableHeadingProps>(
  ({ className, text, ...props }, ref) => (
    <h1 ref={ref} className={`text-black text-size32 ${className}`} {...props}>
      {text}
    </h1>
  )
);

const HeaderDescription = React.forwardRef<
  HTMLDivElement,
  IEditableHeadingProps
>(({ className, text, ...props }, ref) => (
  <h2 ref={ref} className={`text-black-80 text-size16 ${className}`} {...props}>
    {text}
  </h2>
));

export interface IHeaderNavbarList {
  linkName: string;
  path: string;
}

export interface HeaderNavbarProps extends React.HTMLAttributes<HTMLElement> {
  items: IHeaderNavbarList[];
}

const HeaderNavbar = React.forwardRef<HTMLDivElement, HeaderNavbarProps>(
  ({ className, items, ...props }, ref) => (
    <nav
      ref={ref}
      className={`flex mt-custom24 items-center ${className}`}
      {...props}
    >
      {items.map((li) => (
        <Link className="pt-custom16 border-b" href={li.path}></Link>
      ))}
    </nav>
  )
);

const HeaderBack = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => <BackPageButton ref={ref} {...props} />);

export { Header, HeaderTitle, HeaderDescription, HeaderNavbar, HeaderBack };
