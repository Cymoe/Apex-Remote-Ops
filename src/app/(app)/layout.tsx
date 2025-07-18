import { Sidebar } from '@/components/sidebar';
import { MobileNavWrapper } from '@/components/mobile-nav-wrapper';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-carbon-black">
      {/* Fixed sidebar */}
      <div className="fixed inset-y-0 left-0 z-50">
        <Sidebar />
      </div>
      
      {/* Mobile navigation */}
      <MobileNavWrapper />
      
      {/* Main content with left margin for sidebar */}
      <main className="md:ml-64 min-h-screen bg-carbon-black">
        <div className="p-4 sm:p-6 lg:p-8 bg-carbon-black pt-20 md:pt-4">
          {children}
        </div>
      </main>
    </div>
  );
}