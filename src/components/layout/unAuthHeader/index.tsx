import { Header } from '@/components/shared/header';
import LocaleSwitch from '@/components/shared/locale/localeSwitch';
import React from 'react';

type Props = {};

const UnAuthHeader = (props: Props) => {
  return (
    <Header>
      <div className="text-black md:text-white duration-200">Demo Test</div>
    </Header>
  );
};

export default UnAuthHeader;
