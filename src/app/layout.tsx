import { NextIntlClientProvider } from 'next-intl';
import './globals.css';
import { getMessages } from 'next-intl/server';
import RTKQueryProvider from '@/components/layout/provider/RTKQuery';

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className="bg-background">
        <NextIntlClientProvider messages={messages}>
            <RTKQueryProvider>{children}</RTKQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
