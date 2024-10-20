import React from 'react';
import Navbar from '../navbar';
import { navMenu } from '@/lib/data/nav';
import GeneratePageTitle from './ui/generatePageTitle';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Navbar navLinks={navMenu} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <GeneratePageTitle />
        <div className="p-mainLayout flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
