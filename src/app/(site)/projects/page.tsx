import { supabase } from '@/src/lib/supabase';
import ProjectsPage from '@/src/components/Projects';

export const dynamic = 'force-dynamic';

export default async function Projects() {
  const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false }) || { data: [] };
  const projects = projectsData || [];
  return <ProjectsPage projects={projects} />;
}
