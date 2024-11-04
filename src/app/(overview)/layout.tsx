import PageLayout from '@/components/layout/pageLayout';
import ContextProvider from '@/components/layout/provider/ContextProvider';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContextProvider>
      <PageLayout>{children}</PageLayout>
    </ContextProvider>
  );
}
