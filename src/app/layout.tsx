import './globals.css';
import InternationalProvider from '@/components/layout/provider/internationalProvider';

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body className='bg-background'>
        <InternationalProvider >
          {children}
        </InternationalProvider>
      </body>
    </html>
  );
}
