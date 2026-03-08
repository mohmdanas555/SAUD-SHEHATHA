import { supabase } from '@/src/lib/supabase';
import AboutPage from '@/src/components/About';

export default async function About() {
  const { data: contentData } = await supabase.from('content').select('*') || { data: [] };
  const content = contentData || [];
  
  const aboutHeadline = content.find((c: any) => c.id === 'about_page_headline')?.value;
  const aboutDescription = content.find((c: any) => c.id === 'about_page_description')?.value;

  return <AboutPage headline={aboutHeadline || ''} description={aboutDescription || ''} />;
}
