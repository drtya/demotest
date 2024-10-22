import React, { memo } from 'react';
import BackPageButton from './ui/backButton';
import HeaderProfile from './ui/headerProfile';

export interface IEditableHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  text?: string;
}
export interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  nav?: JSX.Element;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}

const Header = React.forwardRef<HTMLDivElement, IHeaderProps>(
  ({ className, nav, children, ...props }, ref) => (
    <header className="p-headerAuth w-full z-10">
      <div className="flex items-center justify-between">
        {children}
        <HeaderProfile className="max-sm:hidden" />
      </div>
      <div className="border-b mt-custom24" ref={ref} {...props}>
        {nav}
      </div>
    </header>
  )
);

const HeaderTitle = memo(
  React.forwardRef<HTMLDivElement, IEditableHeadingProps>(
    ({ className, text, ...props }, ref) => (
      <h1
        ref={ref}
        className={`text-black text-size32 ${className}`}
        {...props}
      >
        {text}
      </h1>
    )
  )
);

const HeaderDescription = memo(
  React.forwardRef<HTMLDivElement, IEditableHeadingProps>(
    ({ className, text, ...props }, ref) => (
      <h2
        ref={ref}
        className={`text-black-80 text-size16 ${className}`}
        {...props}
      >
        {text}
      </h2>
    )
  )
);

const HeaderBack = memo(
  React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
    ({ className, ...props }, ref) => <BackPageButton ref={ref} {...props} />
  )
);

export { Header, HeaderTitle, HeaderDescription, HeaderBack };
