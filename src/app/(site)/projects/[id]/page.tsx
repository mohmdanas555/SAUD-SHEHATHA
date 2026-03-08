import { supabase } from '@/src/lib/supabase';
import ProjectDetailPage from '@/src/views/ProjectDetail';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabase.from('projects').select('title, description, image').eq('id', id).single();
  if (!data) return { title: 'Project Not Found' };
  return {
    title: `${data.title} — Saud Shehatha Construction`,
    description: data.description || '',
    openGraph: { images: [data.image] },
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: project } = await supabase.from('projects').select('*').eq('id', id).single();
  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
