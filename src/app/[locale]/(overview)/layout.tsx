import Navbar from '@/components/layout/navbar';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Navbar />
      {children}
    </div>
  );
}
