import { supabase } from '@/src/lib/supabase';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import CustomCursor from '@/src/components/CustomCursor';

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: settingsData } = await supabase.from('settings').select('*') || { data: [] };
  const settings = settingsData || [];
  
  const getSetting = (id: string) => settings.find((s: any) => s.id === id)?.value || '';

  const siteSettings = {
    name: getSetting('company_name'),
    logo: getSetting('company_logo_url'),
    email: getSetting('company_email'),
    phone: getSetting('company_phone'),
    whatsapp: getSetting('company_whatsapp'),
    address: getSetting('company_address'),
    socials: {
      linkedin: getSetting('social_linkedin'),
      instagram: getSetting('social_instagram'),
      twitter: getSetting('social_twitter'),
      youtube: getSetting('social_youtube'),
    }
  };

  return (
    <>
      <CustomCursor />
      <Navbar settings={siteSettings} />
      <main>
        {children}
      </main>
      <Footer settings={siteSettings} />
    </>
  )
}
