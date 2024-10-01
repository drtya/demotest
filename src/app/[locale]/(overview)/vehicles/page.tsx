import PageLayout from '@/components/layout/pageLayout';
import VehiclesPage from '@/components/pages/vehicles';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <PageLayout>
      <VehiclesPage />
    </PageLayout>
  );
};

export default Page;
