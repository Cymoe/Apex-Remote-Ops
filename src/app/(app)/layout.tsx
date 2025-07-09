import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-carbon-black">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-carbon-black">
        <Header />
        <div className="p-4 sm:p-6 lg:p-8 flex-1 bg-carbon-black">
          {children}
        </div>
      </main>
    </div>
  );
}