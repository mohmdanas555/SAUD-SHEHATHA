import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import CustomCursor from '@/src/components/CustomCursor';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
