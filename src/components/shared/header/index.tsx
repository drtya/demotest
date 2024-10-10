import React from 'react';
import BackPageButton from './ui/backButton';
import HeaderProfile from './ui/headerProfile';

export interface IEditableHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  text?: string;
}
export interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  nav?: JSX.Element;
}

const Header = React.forwardRef<HTMLElement, IHeaderProps>(
  ({ className, nav, children, ...props }, ref) => (
    <header className="p-headerAuth w-full z-50" >
      <div className="flex items-center justify-between">
        {children}
        <HeaderProfile />
      </div>
      <div className='border-b mt-custom24' ref={ref} {...props}>{nav}</div>
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


const HeaderBack = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => <BackPageButton ref={ref} {...props} />);

export { Header, HeaderTitle, HeaderDescription, HeaderBack };
