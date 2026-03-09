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

  return (
    <>
      <Hero headline={heroHeadline || ''} description={heroDescription || ''} />
      <Stats />
      <About />
      <Projects projects={(projects || []).slice(0, 4)} />
      <Blog posts={(blog_posts || []).slice(0, 6)} />
      <Contact />
    </>
  );
}
