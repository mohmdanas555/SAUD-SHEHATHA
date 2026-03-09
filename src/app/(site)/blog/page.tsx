import { supabase } from '@/src/lib/supabase';
import BlogPage from '@/src/components/Blog';

export const dynamic = 'force-dynamic';

export default async function Blog() {
  const { data: blogData } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false }) || { data: [] };
  const blog_posts = blogData || [];
  return <BlogPage posts={blog_posts} />;
}
