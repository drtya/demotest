'use client';
import { NextIntlClientProvider } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { getUserLocale } from '@/lib/utils/locale';
import { getMessages } from 'next-intl/server';

const InternationalProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<any>();
  const [messages, setMessage] = useState<any>();
  useEffect(() => {
    getMessages().then(setMessage);
    getUserLocale().then(setLocale);
  }, []);
  return (
    <NextIntlClientProvider locale={locale ?? 'en'} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default InternationalProvider;
