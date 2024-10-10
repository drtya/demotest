'use client';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export interface IHeaderNavbarList {
  linkName: string;
  path: string;
}

export interface HeaderNavbarProps extends React.HTMLAttributes<HTMLElement> {
  items: IHeaderNavbarList[];
}

const HeaderNavbar = React.forwardRef<HTMLDivElement, HeaderNavbarProps>(
  ({ className, items, ...props }, ref) => {
    const pathname = usePathname()
    const {replace} =useRouter()
    const clickHandler =(element:IHeaderNavbarList)=>{
        replace(element.path)
    }
    return (
      <nav
        ref={ref}
        className={`flex font-medium text-black-60 items-center gap-custom16 w-full ${className}`}
        {...props}
      >
        {items.map((li) => (
          <button
          type='button'
            className={`translate-y-[1px] pb-3 pt-custom16 border-b ${
              li.path === pathname ? 'text-black border-primary' : ''
            }`}
            onClick={()=>clickHandler(li)}
          >
            {li.linkName}
          </button>
        ))}
      </nav>
    );
  }
);
export { HeaderNavbar };
