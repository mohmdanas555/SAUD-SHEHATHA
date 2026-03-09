import { supabase } from '@/src/lib/supabase';
import Hero from '@/src/components/Hero';
import Stats from '@/src/components/Stats';
import About from '@/src/components/About';
import Projects from '@/src/components/Projects';
import Blog from '@/src/components/Blog';
import Contact from '@/src/components/Contact';

export const dynamic = 'force-dynamic';

// Note: Ensure the tables are created in Supabase first via the provided SQL file!
export default async function Home() {
  const { data: contentData } = await supabase.from('content').select('*') || { data: [] };
  const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false }) || { data: [] };
  const { data: blogData } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false }) || { data: [] };

  const content = contentData || [];
  const projects = projectsData || [];
  const blog_posts = blogData || [];

  const heroHeadline = content.find((c: any) => c.id === 'hero_headline')?.value;
  const heroDescription = content.find((c: any) => c.id === 'hero_description')?.value;

  const getStat = (id: string) => content.find((c: any) => c.id === id)?.value || '';
  const statsData = [
    { value: Number(getStat('stats_1_value')) || 15, suffix: getStat('stats_1_suffix') || '+', label: getStat('stats_1_label') || 'Years of Legacy' },
    { value: Number(getStat('stats_2_value')) || 250, suffix: getStat('stats_2_suffix') || '+', label: getStat('stats_2_label') || 'Completed Developments' },
    { value: Number(getStat('stats_3_value')) || 12, suffix: getStat('stats_3_suffix') || 'M+', label: getStat('stats_3_label') || 'Sq. Ft. Developed' },
    { value: Number(getStat('stats_4_value')) || 100, suffix: getStat('stats_4_suffix') || '%', label: getStat('stats_4_label') || 'Safety Record' },
  ];

  return (
    <>
      <Hero headline={heroHeadline || ''} description={heroDescription || ''} />
      <Stats data={statsData} />
      <About />
      <Projects projects={(projects || []).slice(0, 4)} />
      <Blog posts={(blog_posts || []).slice(0, 6)} />
      <Contact />
    </>
  );
}
