const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const dbUrl = 'https://pqjkqlodpgdvlrreyrkx.supabase.co';
const dbKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxamtxbG9kcGdkdmxycmV5cmt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMDE2MzksImV4cCI6MjA4ODU3NzYzOX0.fgwPG2ftvjoM-Qx6Yn-jH2XSt93cjLghyPaxKjhbfa4';
const supabase = createClient(dbUrl, dbKey);

async function seed() {
  const data = JSON.parse(fs.readFileSync('db_dump.json', 'utf8'));
  
  const projects = data.projects.map((p, i) => ({
    title: 'Project ' + (i + 1),
    category: ['Commercial', 'Residential', 'Industrial'][i % 3],
    image: p.image,
    span: i % 3 === 0 ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'
  }));
  
  const blogs = data.blogs.map((b, i) => ({
    title: 'Industry Insights ' + (i + 1),
    category: 'Architecture',
    author: 'Saud Shehatha',
    date: 'March 10, 2026',
    excerpt: 'Detailed analysis of modern structural engineering in the region.',
    image: b.image
  }));

  const content = [
    { id: 'hero_headline', value: 'Built for Integrity' },
    { id: 'hero_description', value: 'A legacy construction firm defined by structural precision.' },
    { id: 'about_page_headline', value: 'A Legacy Defined by Structural Integrity' },
    { id: 'about_page_description', value: "For over 15 years, Saud Shehatha Construction has been a cornerstone of the region's architectural landscape. We don't just build structures; we engineer environments that stand the test of time." }
  ];

  await supabase.from('projects').insert(projects);
  await supabase.from('blog_posts').insert(blogs);
  await supabase.from('content').upsert(content);
  
  console.log('Dummy Content Successfully Migrated to Supabase!');
}

seed();
