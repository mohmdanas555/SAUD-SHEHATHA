import { supabase } from '@/src/lib/supabase';
import type { Metadata } from 'next'
import '../index.css'
import SmoothScroll from '../components/SmoothScroll'

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const { data: nameData } = await supabase.from('settings').select('value').eq('id', 'company_name').single();
  const { data: faviconData } = await supabase.from('settings').select('value').eq('id', 'company_favicon_url').single();
  
  const companyName = nameData?.value || 'Saud Shehatha Construction';
  const faviconUrl = faviconData?.value || '/icon.png';

  return {
    title: {
      template: `%s | ${companyName}`,
      default: companyName,
    },
    description: 'A legacy construction firm defined by structural precision.',
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data } = await supabase.from('settings').select('value').eq('id', 'company_favicon_url').single();
  const faviconUrl = data?.value || '/icon.png';

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={faviconUrl} />
        <link rel="shortcut icon" href={faviconUrl} />
        <link rel="apple-touch-icon" href={faviconUrl} />
      </head>
      <body className="bg-brand-dark overflow-x-hidden text-brand-light font-sans antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
