'use client';
import LocaleSwitch from '@/components/shared/locale/localeSwitch';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/config';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';

type Props = {
  title: string;
  amount?: number;
  description?: string;
  backBtn?: boolean;
};

const AuthHeader = ({
  title,
  amount,
  description,
  backBtn,
}: Props) => {
  const { back } = useRouter();
  const goBackHandler = () => {
    if (backBtn) {
      back();
    }
  };
  return (
    <header className="p-headerAuth flex items-center justify-between z-50">
      <div className="flex items-center gap-custom24">
        {backBtn && (
          <Button variant="settings" onClick={goBackHandler}>
            <div className="menuIconSize">
              <ArrowLeftIcon />
            </div>
          </Button>
        )}
        <div className="text-black text-size32 ">{title}</div>
      </div>
      <div className="flex items-center gap-custom32">
        <div className="flex items-center gap-custom10">
          <Image src={'/profilePhoto.png'} width={50} height={50} alt="photo" />
          <p className="font-medium text-size15">John Doe</p>
        </div>
        <LocaleSwitch />
      </div>
    </header>
  );
};

export default AuthHeader;
