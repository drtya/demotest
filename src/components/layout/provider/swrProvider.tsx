'use client'
import React from 'react';
import { SWRConfig } from 'swr';


const SWRProvider = ({
  fallback,
  children,
}: {
  fallback: any;
  children: React.ReactNode;
}) => {
  return <SWRConfig value={fallback}>{children}</SWRConfig>;
};

export default SWRProvider;
