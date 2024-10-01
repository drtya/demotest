import PageLayout from '@/components/layout/pageLayout';
import ProfilePage from '@/components/pages/profile';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <PageLayout>
      <ProfilePage />
    </PageLayout>
  );
};

export default Page;
