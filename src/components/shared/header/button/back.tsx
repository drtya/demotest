'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/config';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';

const BackPageButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  const { back } = useRouter();
  const goBackHandler = () => {
    back();
  };
  return (
    <Button variant="settings" onClick={goBackHandler} ref={ref} {...props}>
      <div className="menuIconSize">
        <ArrowLeftIcon />
      </div>
    </Button>
  );
});

export default BackPageButton;
