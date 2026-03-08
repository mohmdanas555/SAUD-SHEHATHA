import { supabase } from '@/src/lib/supabase';
import BlogDetailPage from '@/src/views/BlogDetail';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabase.from('blog_posts').select('title, excerpt, image').eq('id', id).single();
  if (!data) return { title: 'Article Not Found' };
  return {
    title: `${data.title} — Saud Shehatha Construction`,
    description: data.excerpt || '',
    openGraph: { images: [data.image] },
  };
}

export default async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single();
  if (!post) notFound();

  // Fetch 3 related articles (same category, excluding current)
  const { data: related } = await supabase
    .from('blog_posts')
    .select('id, title, category, image, author, date')
    .eq('category', post.category)
    .neq('id', id)
    .limit(3);

  return <BlogDetailPage post={post} related={related || []} />;
}
