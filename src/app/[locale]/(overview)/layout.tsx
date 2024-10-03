import Navbar from '@/components/layout/navbar';
import PageLayout from '@/components/layout/pageLayout';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Navbar />
      <PageLayout>
      {children}
    </PageLayout>
    </div>
  );
}
