import PageLayout from '@/components/layout/pageLayout';
import SettingPage from '@/components/pages/setting';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <PageLayout>
      <SettingPage />
    </PageLayout>
  );
};

export default Page;
