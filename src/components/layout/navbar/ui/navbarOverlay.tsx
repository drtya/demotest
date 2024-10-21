'use client'
import { useAppSelector } from '@/store/hooks';
import React from 'react'

const NavbarOverlay = ({className,children}:{className?:string,children:React.ReactNode}) => {
  const isOpen = useAppSelector((state) => state.global.burger)


  return (
    <div
      className={`h-screen menuImage max-sm:fixed max-sm:top-0 left-0 z-20 pt-custom32 bg-menuColor flex flex-col w-navbar overflow-hidden duration-200 ${
        isOpen ? 'max-mobile360:w-full' : 'max-sm:w-0'
      } ${className}`}
    >{children}</div>
  )
}

export default NavbarOverlay