"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import {
  Save, Trash2, Plus, X, Layout, Briefcase, FileText, Upload,
  LogOut, ChevronRight, Settings, Users, Image as ImageIcon,
  Menu, Edit, Globe, Phone, MapPin, Mail, Instagram, Linkedin,
  Twitter, Youtube, Building2, Eye
} from 'lucide-react';
import { supabase } from '../lib/supabase';

type Project = {
  id: string; title: string; category: string; image: string; span: string;
  description?: string; location?: string; area?: string; year?: string;
  status?: string; duration?: string; value?: string;
  gallery?: string[]; highlights?: string[];
  created_at?: string;
};

type BlogPost = {
  id: string; title: string; category: string; author: string;
  date: string; excerpt: string; image: string; content?: string;
  created_at?: string;
};

type TabType = 'dashboard' | 'pages' | 'projects' | 'blog' | 'settings';

const MODAL_INPUT = "w-full bg-black/50 border border-white/10 p-3 rounded-xl text-white focus:border-brand-gold outline-none text-sm";
const MODAL_LABEL = "text-[10px] uppercase tracking-[0.2em] opacity-50 font-bold";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [data, setData] = useState<{ content: any[]; projects: Project[]; blog_posts: BlogPost[]; settings: any[] }>({ content: [], projects: [], blog_posts: [], settings: [] });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Modal state
  const [projectModal, setProjectModal] = useState<{ open: boolean; mode: 'add' | 'edit'; data?: Project }>({ open: false, mode: 'add' });
  const [blogModal, setBlogModal] = useState<{ open: boolean; mode: 'add' | 'edit'; data?: BlogPost }>({ open: false, mode: 'add' });
  const [settingsSaving, setSettingsSaving] = useState(false);

  useEffect(() => {
    fetchData();
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Incorrect Password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contentRes, projectsRes, blogRes, settingsRes] = await Promise.all([
        supabase.from('content').select('*'),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('settings').select('*'),
      ]);
      setData({
        content: contentRes.data || [],
        projects: projectsRes.data || [],
        blog_posts: blogRes.data || [],
        settings: settingsRes.data || [],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSetting = (id: string) => data.settings.find((s: any) => s.id === id)?.value || '';

  const saveSetting = async (id: string, value: string) => {
    await supabase.from('settings').upsert({ id, value, updated_at: new Date().toISOString() });
  };

  const updateContent = async (id: string, value: string) => {
    await supabase.from('content').upsert({ id, value });
    fetchData();
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
      const { error } = await supabase.storage.from('uploads').upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage.from('uploads').getPublicUrl(fileName);
      return data.publicUrl;
    } catch (err: any) {
      alert('Upload error: ' + err.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const resolveImageUrl = async (formData: FormData): Promise<string> => {
    const file = formData.get('imageFile') as File;
    let url = formData.get('imageUrl') as string || '';
    if (file && file.size > 0) {
      const uploaded = await uploadFile(file);
      if (uploaded) url = uploaded;
    }
    return url;
  };

  // ── PROJECT OPERATIONS ──────────────────────────────────────
  const saveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const imageUrl = await resolveImageUrl(fd);

    const payload: Partial<Project> = {
      title: fd.get('title') as string,
      category: fd.get('category') as string,
      span: fd.get('span') as string,
      description: fd.get('description') as string,
      location: fd.get('location') as string,
      area: fd.get('area') as string,
      year: fd.get('year') as string,
      status: fd.get('status') as string,
      duration: fd.get('duration') as string,
      value: fd.get('value') as string,
      highlights: (fd.get('highlights') as string).split('\n').map(s => s.trim()).filter(Boolean),
    };
    if (imageUrl) payload.image = imageUrl;

    if (projectModal.mode === 'edit' && projectModal.data?.id) {
      await supabase.from('projects').update(payload).eq('id', projectModal.data.id);
    } else {
      if (!payload.image) return alert('Please provide an image.');
      await supabase.from('projects').insert([payload]);
    }

    setProjectModal({ open: false, mode: 'add' });
    fetchData();
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project permanently?')) return;
    await supabase.from('projects').delete().eq('id', id);
    fetchData();
  };

  // ── BLOG OPERATIONS ─────────────────────────────────────────
  const saveBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const imageUrl = await resolveImageUrl(fd);

    const payload: Partial<BlogPost> = {
      title: fd.get('title') as string,
      category: fd.get('category') as string,
      author: fd.get('author') as string,
      date: fd.get('date') as string,
      excerpt: fd.get('excerpt') as string,
      content: fd.get('content') as string,
    };
    if (imageUrl) payload.image = imageUrl;

    if (blogModal.mode === 'edit' && blogModal.data?.id) {
      await supabase.from('blog_posts').update(payload).eq('id', blogModal.data.id);
    } else {
      if (!payload.image) return alert('Please provide an image.');
      await supabase.from('blog_posts').insert([payload]);
    }

    setBlogModal({ open: false, mode: 'add' });
    fetchData();
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Delete this post permanently?')) return;
    await supabase.from('blog_posts').delete().eq('id', id);
    fetchData();
  };

  // ── SETTINGS SAVE ────────────────────────────────────────────
  const handleSettingsSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSettingsSaving(true);
    const fd = new FormData(e.currentTarget);
    const logoFile = fd.get('logo_file') as File;
    const faviconFile = fd.get('favicon_file') as File;

    const updates: { id: string; value: string }[] = [
      { id: 'company_name', value: fd.get('company_name') as string },
      { id: 'company_tagline', value: fd.get('company_tagline') as string },
      { id: 'company_email', value: fd.get('company_email') as string },
      { id: 'company_phone', value: fd.get('company_phone') as string },
      { id: 'company_whatsapp', value: fd.get('company_whatsapp') as string },
      { id: 'company_address', value: fd.get('company_address') as string },
      { id: 'social_linkedin', value: fd.get('social_linkedin') as string },
      { id: 'social_instagram', value: fd.get('social_instagram') as string },
      { id: 'social_twitter', value: fd.get('social_twitter') as string },
      { id: 'social_youtube', value: fd.get('social_youtube') as string },
      { id: 'map_embed_code', value: fd.get('map_embed_code') as string },
      { id: 'meta_description', value: fd.get('meta_description') as string },
    ];

    if (logoFile && logoFile.size > 0) {
      const url = await uploadFile(logoFile);
      if (url) updates.push({ id: 'company_logo_url', value: url });
    }
    if (faviconFile && faviconFile.size > 0) {
      const url = await uploadFile(faviconFile);
      if (url) updates.push({ id: 'company_favicon_url', value: url });
    }

    await Promise.all(updates.map(u => saveSetting(u.id, u.value)));
    await fetchData();
    setSettingsSaving(false);
    alert('Settings saved successfully!');
  };

  // ── AUTH SCREEN ──────────────────────────────────────────────
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-brand-gold font-sans">Loading Workspace...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-brand-light font-sans">
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleLogin}
          className="max-w-md w-full bg-[#111] p-10 rounded-2xl border border-white/5 space-y-8 shadow-2xl"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold">
              <Settings size={28} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">Saud Shehatha Workspace</h2>
            <p className="text-xs opacity-50 uppercase tracking-widest text-brand-gold">Authorized Personnel Only</p>
          </div>
          <div className="space-y-4">
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Enter master password"
              className="w-full bg-black/50 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-brand-gold text-brand-gold placeholder-brand-light/30 transition-colors"
              required
            />
            <button type="submit" className="w-full bg-brand-gold text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all">
              Authenticate
            </button>
          </div>
          <Link href="/" className="flex items-center justify-center gap-2 text-xs opacity-50 hover:opacity-100 transition-opacity uppercase tracking-widest pt-4">
            <ChevronRight size={14} /> Return to Public Site
          </Link>
        </motion.form>
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'pages', label: 'Page Content', icon: FileText },
    { id: 'projects', label: 'Portfolio', icon: Briefcase },
    { id: 'blog', label: 'Journal', icon: Globe },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  // ── PROJECT MODAL ─────────────────────────────────────────────
  const ProjectModal = () => {
    const p = projectModal.data;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-start justify-center p-4 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] p-8 rounded-2xl border border-white/5 w-full max-w-2xl my-8 relative">
          <button onClick={() => setProjectModal({ open: false, mode: 'add' })} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
            <X size={22} />
          </button>
          <div className="flex items-center gap-3 border-b border-white/5 pb-5 mb-7 pr-10">
            <div className="p-2 bg-brand-gold/10 rounded-lg"><Briefcase size={18} className="text-brand-gold" /></div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">{projectModal.mode === 'edit' ? 'Edit Project' : 'Add New Project'}</h3>
              <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">All fields are stored in Supabase</p>
            </div>
          </div>
          <form onSubmit={saveProject} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1">
                <label className={MODAL_LABEL}>Project Title</label>
                <input name="title" defaultValue={p?.title} className={MODAL_INPUT} required />
              </div>
              <div className="space-y-1">
                <label className={MODAL_LABEL}>Category</label>
                <input name="category" defaultValue={p?.category} placeholder="e.g. Commercial High-Rise" className={MODAL_INPUT} required />
              </div>
              <div className="space-y-1">
                <label className={MODAL_LABEL}>Status</label>
                <select name="status" defaultValue={p?.status || 'Completed'} className={MODAL_INPUT + ' bg-[#1a1a1a]'}>
                  <option>Completed</option>
                  <option>Ongoing</option>
                  <option>Upcoming</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className={MODAL_LABEL}>Location</label>
                <input name="location" defaultValue={p?.location} placeholder="e.g. Business Bay, Dubai" className={MODAL_INPUT} />
              </div>
              <div className="space-y-1">
                <label className={MODAL_LABEL}>Year</label>
                <input name="year" defaultValue={p?.year} placeholder="e.g. 2024" className={MODAL_INPUT} />
              </div>
              <div className="space-y-1">
                <label className={MODAL_LABEL}>Total Area</label>
                <input name="area" defaultValue={p?.area} placeholder="e.g. 48,000 sqm GFA" className={MODAL_INPUT} />
              </div>
              <div className="space-y-1">
                <label className={MODAL_LABEL}>Project Value</label>
                <input name="value" defaultValue={p?.value} placeholder="e.g. AED 1.2 Billion" className={MODAL_INPUT} />
              </div>
              <div className="space-y-1">
                <label className={MODAL_LABEL}>Duration</label>
                <input name="duration" defaultValue={p?.duration} placeholder="e.g. 36 months" className={MODAL_INPUT} />
              </div>
              <div className="space-y-1">
                <label className={MODAL_LABEL}>Grid Size</label>
                <select name="span" defaultValue={p?.span || 'md:col-span-1 md:row-span-1'} className={MODAL_INPUT + ' bg-[#1a1a1a]'}>
                  <option value="md:col-span-1 md:row-span-1">Standard (1×1)</option>
                  <option value="md:col-span-2 md:row-span-1">Wide (2×1)</option>
                  <option value="md:col-span-2 md:row-span-2">Feature (2×2)</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className={MODAL_LABEL}>Project Description</label>
              <textarea name="description" defaultValue={p?.description} rows={4} placeholder="Detailed project overview..." className={MODAL_INPUT + ' resize-none'} />
            </div>
            <div className="space-y-1">
              <label className={MODAL_LABEL}>Key Highlights (one per line)</label>
              <textarea name="highlights" defaultValue={p?.highlights?.join('\n')} rows={4} placeholder="LEED Gold Certified&#10;52 floors&#10;Rooftop helipad" className={MODAL_INPUT + ' resize-none'} />
            </div>
            <div className="space-y-3 border border-white/5 bg-white/[0.02] p-5 rounded-xl">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold flex items-center gap-2"><ImageIcon size={12}/> Cover Image</label>
              <input type="file" name="imageFile" accept="image/*" className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-brand-gold/10 file:text-brand-gold hover:file:bg-brand-gold/20" />
              <div className="flex items-center gap-3 opacity-30 text-[10px] uppercase tracking-widest"><div className="h-px bg-white flex-1"/> OR URL <div className="h-px bg-white flex-1"/></div>
              <input name="imageUrl" defaultValue={p?.image} placeholder="https://..." className={MODAL_INPUT} />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setProjectModal({ open: false, mode: 'add' })} className="flex-1 border border-white/10 text-white/50 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                Cancel
              </button>
              <button type="submit" disabled={uploading} className="flex-1 bg-brand-gold text-black py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {uploading ? 'Uploading...' : projectModal.mode === 'edit' ? 'Save Changes' : 'Publish Project'} <Upload size={14} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  // ── BLOG MODAL ────────────────────────────────────────────────
  const BlogModal = () => {
    const b = blogModal.data;
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-start justify-center p-4 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] p-8 rounded-2xl border border-white/5 w-full max-w-2xl my-8 relative">
          <button onClick={() => setBlogModal({ open: false, mode: 'add' })} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
            <X size={22} />
          </button>
          <div className="flex items-center gap-3 border-b border-white/5 pb-5 mb-7 pr-10">
            <div className="p-2 bg-brand-gold/10 rounded-lg"><FileText size={18} className="text-brand-gold" /></div>
            <div>
              <h3 className="text-lg font-serif font-bold text-white">{blogModal.mode === 'edit' ? 'Edit Article' : 'Draft New Article'}</h3>
              <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">Publish to the Journal section</p>
            </div>
          </div>
          <form onSubmit={saveBlog} className="space-y-4">
            <div className="space-y-1">
              <label className={MODAL_LABEL}>Article Title</label>
              <input name="title" defaultValue={b?.title} className={MODAL_INPUT} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className={MODAL_LABEL}>Category</label>
                <input name="category" defaultValue={b?.category} placeholder="e.g. Engineering Insights" className={MODAL_INPUT} required />
              </div>
              <div className="space-y-1">
                <label className={MODAL_LABEL}>Author</label>
                <input name="author" defaultValue={b?.author} placeholder="e.g. Saud Shehatha" className={MODAL_INPUT} required />
              </div>
            </div>
            <div className="space-y-1">
              <label className={MODAL_LABEL}>Publication Date</label>
              <input name="date" defaultValue={b?.date} placeholder="e.g. March 15, 2026" className={MODAL_INPUT} required />
            </div>
            <div className="space-y-1">
              <label className={MODAL_LABEL}>Excerpt / Summary</label>
              <textarea name="excerpt" defaultValue={b?.excerpt} rows={3} className={MODAL_INPUT + ' resize-none'} required />
            </div>
            <div className="space-y-1">
              <label className={MODAL_LABEL}>Full Article Body (optional)</label>
              <textarea name="content" defaultValue={b?.content} rows={6} placeholder="Write the full article content here..." className={MODAL_INPUT + ' resize-none'} />
            </div>
            <div className="space-y-3 border border-white/5 bg-white/[0.02] p-5 rounded-xl">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold flex items-center gap-2"><ImageIcon size={12}/> Cover Image</label>
              <input type="file" name="imageFile" accept="image/*" className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-brand-gold/10 file:text-brand-gold hover:file:bg-brand-gold/20" />
              <div className="flex items-center gap-3 opacity-30 text-[10px] uppercase tracking-widest"><div className="h-px bg-white flex-1"/> OR URL <div className="h-px bg-white flex-1"/></div>
              <input name="imageUrl" defaultValue={b?.image} placeholder="https://..." className={MODAL_INPUT} />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setBlogModal({ open: false, mode: 'add' })} className="flex-1 border border-white/10 text-white/50 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                Cancel
              </button>
              <button type="submit" disabled={uploading} className="flex-1 bg-brand-gold text-black py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {uploading ? 'Uploading...' : blogModal.mode === 'edit' ? 'Save Changes' : 'Publish Article'} <Upload size={14} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  };

  // ── MAIN RENDER ───────────────────────────────────────────────
  return (
    <div className="min-h-screen flex bg-[#050505] text-brand-light font-sans">
      {projectModal.open && <ProjectModal />}
      {blogModal.open && <BlogModal />}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="w-64 bg-[#111] border-r border-white/5 flex flex-col justify-between fixed md:sticky top-0 z-50 h-screen overflow-y-auto shrink-0"
      >
        <div>
          <div className="p-6 border-b border-white/5">
            <h1 className="text-lg font-serif font-bold text-white tracking-wide">Saud Shehatha</h1>
            <p className="text-[10px] text-brand-gold uppercase tracking-[0.25em] mt-1">Admin Workspace</p>
          </div>
          <nav className="p-3 space-y-1 mt-3">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as TabType); if (window.innerWidth < 768) setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === item.id
                    ? 'bg-brand-gold/10 text-brand-gold border border-brand-gold/20'
                    : 'text-brand-light/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-6 border-t border-white/5">
          <Link href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors mb-2">
            <Eye size={14} /> View Site
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050505]">
        <header className="h-16 shrink-0 bg-[#111]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-white/50 hover:text-white" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={22} />
            </button>
            <h2 className="text-base font-serif font-bold text-white capitalize">
              {menuItems.find(m => m.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-brand-light/40 text-[10px] hidden sm:block uppercase tracking-widest">Supabase Connected</span>
            <div className="w-7 h-7 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold border border-brand-gold/30">
              <Users size={12} />
            </div>
          </div>
        </header>

        <div className="p-5 md:p-8 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="max-w-6xl mx-auto"
            >

              {/* ── DASHBOARD ── */}
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Briefcase, label: 'Projects', value: data.projects.length },
                      { icon: FileText, label: 'Articles', value: data.blog_posts.length },
                      { icon: Globe, label: 'Content Nodes', value: data.content.length },
                      { icon: Settings, label: 'Settings', value: data.settings.length },
                    ].map((stat, i) => (
                      <div key={i} className="bg-[#111] p-6 rounded-2xl border border-white/5">
                        <stat.icon className="text-brand-gold mb-3" size={24} />
                        <p className="text-3xl font-serif font-bold text-white">{stat.value}</p>
                        <p className="text-[10px] uppercase tracking-widest opacity-40 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-brand-gold mb-4">Recent Projects</h3>
                      <div className="space-y-3">
                        {data.projects.slice(0, 4).map((p) => (
                          <div key={p.id} className="flex items-center gap-3">
                            <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white font-medium truncate">{p.title}</p>
                              <p className="text-[10px] text-white/30 uppercase tracking-widest">{p.status || 'Completed'}</p>
                            </div>
                            <span className={`text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider ${p.status === 'Ongoing' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/40'}`}>{p.status || 'Completed'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-brand-gold mb-4">Recent Articles</h3>
                      <div className="space-y-3">
                        {data.blog_posts.slice(0, 4).map((b) => (
                          <div key={b.id} className="flex items-center gap-3">
                            <img src={b.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white font-medium truncate">{b.title}</p>
                              <p className="text-[10px] text-white/30 uppercase tracking-widest">{b.author} · {b.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── PAGE CONTENT ── */}
              {activeTab === 'pages' && (
                <div className="space-y-8">
                  {[
                    { title: 'Hero Section', fields: [
                      { id: 'hero_headline', label: 'Headline Tagline', type: 'input' },
                      { id: 'hero_description', label: 'Hero Description', type: 'textarea', rows: 3 },
                    ]},
                    { title: 'About Page', fields: [
                      { id: 'about_page_headline', label: 'Section Header', type: 'input' },
                      { id: 'about_page_description', label: 'Full Biography / Description', type: 'textarea', rows: 8 },
                    ]},
                  ].map(section => (
                    <div key={section.title} className="bg-[#111] p-7 rounded-2xl border border-white/5">
                      <h3 className="text-xl font-serif font-bold text-brand-gold border-b border-white/5 pb-4 mb-6">{section.title}</h3>
                      <div className="space-y-6">
                        {section.fields.map(f => (
                          <div key={f.id} className="space-y-2">
                            <label className={MODAL_LABEL}>{f.label}</label>
                            {f.type === 'textarea' ? (
                              <textarea rows={f.rows} defaultValue={data.content.find((c: any) => c.id === f.id)?.value || ''}
                                onBlur={e => updateContent(f.id, e.target.value)}
                                className={MODAL_INPUT + ' resize-none'} />
                            ) : (
                              <input type="text" defaultValue={data.content.find((c: any) => c.id === f.id)?.value || ''}
                                onBlur={e => updateContent(f.id, e.target.value)}
                                className={MODAL_INPUT} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── PROJECTS ── */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-[#111] p-5 rounded-2xl border border-white/5">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-white">Project Portfolio</h3>
                      <p className="text-[10px] text-brand-light/40 mt-1 uppercase tracking-widest">{data.projects.length} projects in database</p>
                    </div>
                    <button onClick={() => setProjectModal({ open: true, mode: 'add' })} className="bg-brand-gold text-black px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 shadow-lg">
                      <Plus size={14} /> Add Project
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {data.projects.map(p => (
                      <div key={p.id} className="group bg-[#111] rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <span className={`absolute top-3 right-3 text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider ${p.status === 'Ongoing' ? 'bg-green-500/90 text-white' : p.status === 'Upcoming' ? 'bg-blue-500/90 text-white' : 'bg-brand-gold text-black'}`}>
                            {p.status || 'Completed'}
                          </span>
                          <span className="absolute bottom-3 left-3 text-[10px] bg-black/70 text-white/80 px-2 py-1 rounded font-bold uppercase tracking-widest backdrop-blur-sm">
                            {p.category}
                          </span>
                        </div>
                        <div className="p-4">
                          <p className="font-serif font-bold text-white text-base truncate mb-1">{p.title}</p>
                          <div className="flex items-center gap-3 text-[10px] text-white/30 uppercase tracking-widest mb-4">
                            {p.location && <span className="flex items-center gap-1"><MapPin size={9}/> {p.location}</span>}
                            {p.year && <span>{p.year}</span>}
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/projects/${p.id}`} target="_blank" className="flex-none p-2 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-lg transition-colors">
                              <Eye size={14} />
                            </Link>
                            <button onClick={() => setProjectModal({ open: true, mode: 'edit', data: p })} className="flex-1 bg-white/5 hover:bg-brand-gold/10 hover:text-brand-gold text-white/60 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5">
                              <Edit size={11}/> Edit
                            </button>
                            <button onClick={() => deleteProject(p.id)} className="flex-none p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── BLOG ── */}
              {activeTab === 'blog' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-[#111] p-5 rounded-2xl border border-white/5">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-white">Journal & Articles</h3>
                      <p className="text-[10px] text-brand-light/40 mt-1 uppercase tracking-widest">{data.blog_posts.length} articles published</p>
                    </div>
                    <button onClick={() => setBlogModal({ open: true, mode: 'add' })} className="bg-brand-gold text-black px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 shadow-lg">
                      <Plus size={14} /> Draft Article
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {data.blog_posts.map(b => (
                      <div key={b.id} className="group bg-[#111] p-5 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all flex gap-4">
                        <img src={b.image} className="w-24 h-24 rounded-xl object-cover shrink-0 border border-white/5" alt="" />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif font-bold text-white text-base line-clamp-2 leading-tight group-hover:text-brand-gold transition-colors mb-2">{b.title}</p>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">{b.author} · {b.date}</p>
                          <div className="flex gap-2">
                            <button onClick={() => setBlogModal({ open: true, mode: 'edit', data: b })} className="flex-1 bg-white/5 hover:bg-brand-gold/10 hover:text-brand-gold text-white/50 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1">
                              <Edit size={10}/> Edit
                            </button>
                            <button onClick={() => deleteBlog(b.id)} className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-colors">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SETTINGS ── */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSettingsSave} className="space-y-8">
                  {/* Company Identity */}
                  <div className="bg-[#111] p-7 rounded-2xl border border-white/5">
                    <h3 className="text-xl font-serif font-bold text-brand-gold border-b border-white/5 pb-4 mb-6 flex items-center gap-2"><Building2 size={18}/> Company Identity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className={MODAL_LABEL}>Company Name</label>
                        <input name="company_name" defaultValue={getSetting('company_name')} className={MODAL_INPUT} />
                      </div>
                      <div className="space-y-1">
                        <label className={MODAL_LABEL}>Tagline / Slogan</label>
                        <input name="company_tagline" defaultValue={getSetting('company_tagline')} className={MODAL_INPUT} />
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className={MODAL_LABEL}>Logo — Upload New File</label>
                        <input type="file" name="logo_file" accept="image/*" className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-brand-gold/10 file:text-brand-gold hover:file:bg-brand-gold/20" />
                        {getSetting('company_logo_url') && <p className="text-[10px] text-white/30 mt-1 truncate">Current: {getSetting('company_logo_url')}</p>}
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className={MODAL_LABEL}>Favicon — Upload New File</label>
                        <input type="file" name="favicon_file" accept="image/*" className="w-full text-xs file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-brand-gold/10 file:text-brand-gold hover:file:bg-brand-gold/20" />
                        {getSetting('company_favicon_url') && <p className="text-[10px] text-white/30 mt-1 truncate">Current: {getSetting('company_favicon_url')}</p>}
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className={MODAL_LABEL}>Meta Description (SEO)</label>
                        <textarea name="meta_description" defaultValue={getSetting('meta_description')} rows={2} className={MODAL_INPUT + ' resize-none'} />
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="bg-[#111] p-7 rounded-2xl border border-white/5">
                    <h3 className="text-xl font-serif font-bold text-brand-gold border-b border-white/5 pb-4 mb-6 flex items-center gap-2"><Phone size={18}/> Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label className={MODAL_LABEL + ' flex items-center gap-1'}><Mail size={10}/> Email</label>
                        <input name="company_email" defaultValue={getSetting('company_email')} type="email" className={MODAL_INPUT} />
                      </div>
                      <div className="space-y-1">
                        <label className={MODAL_LABEL + ' flex items-center gap-1'}><Phone size={10}/> Phone</label>
                        <input name="company_phone" defaultValue={getSetting('company_phone')} className={MODAL_INPUT} />
                      </div>
                      <div className="space-y-1">
                        <label className={MODAL_LABEL}>WhatsApp Number</label>
                        <input name="company_whatsapp" defaultValue={getSetting('company_whatsapp')} className={MODAL_INPUT} />
                      </div>
                      <div className="space-y-1">
                        <label className={MODAL_LABEL + ' flex items-center gap-1'}><MapPin size={10}/> Address</label>
                        <input name="company_address" defaultValue={getSetting('company_address')} className={MODAL_INPUT} />
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="bg-[#111] p-7 rounded-2xl border border-white/5">
                    <h3 className="text-xl font-serif font-bold text-brand-gold border-b border-white/5 pb-4 mb-6 flex items-center gap-2"><Globe size={18}/> Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {[
                        { id: 'social_linkedin', icon: Linkedin, label: 'LinkedIn URL' },
                        { id: 'social_instagram', icon: Instagram, label: 'Instagram URL' },
                        { id: 'social_twitter', icon: Twitter, label: 'X / Twitter URL' },
                        { id: 'social_youtube', icon: Youtube, label: 'YouTube URL' },
                      ].map(s => (
                        <div key={s.id} className="space-y-1">
                          <label className={MODAL_LABEL + ' flex items-center gap-1'}><s.icon size={10}/> {s.label}</label>
                          <input name={s.id} defaultValue={getSetting(s.id)} type="url" placeholder="https://..." className={MODAL_INPUT} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Map Embed */}
                  <div className="bg-[#111] p-7 rounded-2xl border border-white/5">
                    <h3 className="text-xl font-serif font-bold text-brand-gold border-b border-white/5 pb-4 mb-6 flex items-center gap-2"><MapPin size={18}/> Google Maps Embed</h3>
                    <div className="space-y-3">
                      <p className="text-xs text-white/40 leading-relaxed">Go to Google Maps → Share → Embed a map → Copy HTML. Paste the full &lt;iframe&gt; code below.</p>
                      <textarea name="map_embed_code" defaultValue={getSetting('map_embed_code')} rows={4} className={MODAL_INPUT + ' resize-none font-mono text-xs'} placeholder='<iframe src="https://www.google.com/maps/embed?..." ...' />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" disabled={settingsSaving || uploading} className="bg-brand-gold text-black px-10 py-3.5 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 flex items-center gap-2 shadow-xl">
                      {settingsSaving ? 'Saving...' : 'Save All Settings'} <Save size={15} />
                    </button>
                  </div>
                </form>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
