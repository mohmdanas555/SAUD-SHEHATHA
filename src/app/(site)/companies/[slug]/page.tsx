import { supabase } from '@/src/lib/supabase';
import SubsidiaryDetail from '@/src/views/SubsidiaryDetail';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase.from('companies').select('name, subtitle, image').eq('slug', slug).single();
  if (!data) return { title: 'Company Not Found' };
  
  return {
    title: `${data.name} — Saud Shehatha Group`,
    description: data.subtitle || '',
    openGraph: {
      images: [data.image],
    },
  };
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!company) notFound();

  return <SubsidiaryDetail company={company} />;
}
