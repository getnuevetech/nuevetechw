import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/providers/trpc';
import { useNavigate } from 'react-router';

const defaultSections = [
  { key: 'hero', title: 'Hero Section', label: 'Homepage hero headline and intro' },
  { key: 'about', title: 'About Section', label: 'About Nueve content' },
  { key: 'ventures', title: 'Ventures Section', label: 'Ventures portfolio description' },
  { key: 'what_we_build', title: 'What We Build', label: 'Technology areas description' },
  { key: 'philosophy', title: 'Philosophy Section', label: 'Company philosophy content' },
  { key: 'founder', title: 'Founder Story', label: 'Founder biography content' },
  { key: 'partner', title: 'Partner Section', label: 'Partnership page content' },
  { key: 'contact', title: 'Contact Section', label: 'Contact page content' },
];

export default function AdminPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'overview' | 'content' | 'contacts' | 'settings'>('overview');
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [message, setMessage] = useState('');

  const { data: sections } = trpc.section.list.useQuery();
  const { data: contacts } = trpc.contact.list.useQuery(undefined, { enabled: tab === 'contacts' });
  const { data: settingsList } = trpc.setting.list.useQuery();

  const utils = trpc.useUtils();
  const upsertSection = trpc.section.upsert.useMutation({
    onSuccess: () => { utils.section.list.invalidate(); setEditingKey(null); setMessage('Section saved!'); setTimeout(() => setMessage(''), 3000); },
  });
  const updateStatus = trpc.contact.updateStatus.useMutation({
    onSuccess: () => utils.contact.list.invalidate(),
  });
  const deleteContact = trpc.contact.delete.useMutation({
    onSuccess: () => utils.contact.list.invalidate(),
  });
  const upsertSetting = trpc.setting.upsert.useMutation({
    onSuccess: () => utils.setting.list.invalidate(),
  });

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-[#64748B]">Loading...</div>;
  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  const getSection = (key: string) => sections?.find((s) => s.key === key);
  const getSetting = (key: string) => settingsList?.find((s) => s.key === key)?.value ?? '';

  const startEdit = (key: string) => {
    const s = getSection(key);
    setEditingKey(key);
    setEditTitle(s?.title ?? defaultSections.find((d) => d.key === key)?.title ?? '');
    setEditContent(s?.content ?? '');
  };

  const saveEdit = () => {
    if (!editingKey) return;
    upsertSection.mutate({ key: editingKey, title: editTitle, content: editContent });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Bar */}
      <div className="bg-[#1A3A5C] text-white">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Nueve Admin</span>
            <span className="text-xs text-white/40 px-2 py-0.5 rounded bg-white/10">CMS</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">{user.name}</span>
            <a href="/" className="text-sm text-[#D4A853] hover:text-white transition-colors">View Site</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {message && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{message}</div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-lg p-1 mb-8 shadow-sm border border-[#E2E8F0]">
          {([
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'content', label: 'Content Editor', icon: '📝' },
            { id: 'contacts', label: 'Contact Submissions', icon: '📧' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
          ]).map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as typeof tab)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${tab === t.id ? 'bg-[#1A3A5C] text-white' : 'text-[#64748B] hover:text-[#1C1917] hover:bg-[#F8FAFC]'}`}>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {tab === 'overview' && (
          <div>
            <h2 className="text-2xl font-semibold text-[#1C1917] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Dashboard Overview</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E2E8F0]">
                <p className="text-xs uppercase tracking-wider text-[#94A3B8] mb-1">Total Sections</p>
                <p className="text-3xl font-bold text-[#1A3A5C]">{sections?.length ?? 0}</p>
                <p className="text-xs text-[#94A3B8] mt-1">of {defaultSections.length} editable</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E2E8F0]">
                <p className="text-xs uppercase tracking-wider text-[#94A3B8] mb-1">Contact Messages</p>
                <p className="text-3xl font-bold text-[#1A3A5C]">{contacts?.length ?? 0}</p>
                <p className="text-xs text-[#94A3B8] mt-1">total submissions</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E2E8F0]">
                <p className="text-xs uppercase tracking-wider text-[#94A3B8] mb-1">New Messages</p>
                <p className="text-3xl font-bold text-[#D4A853]">{contacts?.filter((c) => c.status === 'new').length ?? 0}</p>
                <p className="text-xs text-[#94A3B8] mt-1">unread</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E2E8F0]">
                <p className="text-xs uppercase tracking-wider text-[#94A3B8] mb-1">Settings</p>
                <p className="text-3xl font-bold text-[#1A3A5C]">{settingsList?.length ?? 0}</p>
                <p className="text-xs text-[#94A3B8] mt-1">configured</p>
              </div>
            </div>
          </div>
        )}

        {/* Content Editor Tab */}
        {tab === 'content' && (
          <div>
            <h2 className="text-2xl font-semibold text-[#1C1917] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Content Editor</h2>
            {editingKey ? (
              <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#1C1917]">Editing: {defaultSections.find((d) => d.key === editingKey)?.title}</h3>
                  <button onClick={() => setEditingKey(null)} className="text-sm text-[#64748B] hover:text-[#1C1917]">Cancel</button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] mb-1.5">Title</label>
                    <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-md border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/20 focus:border-[#1A3A5C]" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] mb-1.5">Content (Markdown supported)</label>
                    <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={12} className="w-full px-4 py-2.5 rounded-md border border-[#E2E8F0] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/20 focus:border-[#1A3A5C] resize-y" />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={saveEdit} disabled={upsertSection.isPending} className="btn-primary">{upsertSection.isPending ? 'Saving...' : 'Save Changes'}</button>
                    <button onClick={() => setEditingKey(null)} className="btn-outline">Cancel</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {defaultSections.map((s) => {
                  const section = getSection(s.key);
                  return (
                    <div key={s.key} className="bg-white rounded-lg p-5 shadow-sm border border-[#E2E8F0] flex items-center justify-between hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[#1C1917] text-sm">{s.title}</h3>
                          {section && <span className="text-[10px] bg-[#E8F0FE] text-[#1A3A5C] px-2 py-0.5 rounded-full font-medium">Edited</span>}
                        </div>
                        <p className="text-xs text-[#94A3B8]">{s.label}</p>
                      </div>
                      <button onClick={() => startEdit(s.key)} className="text-sm font-medium text-[#1A3A5C] hover:text-[#D4A853] transition-colors">
                        {section ? 'Edit' : 'Create'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {tab === 'contacts' && (
          <div>
            <h2 className="text-2xl font-semibold text-[#1C1917] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Contact Submissions</h2>
            {contacts && contacts.length > 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                        <th className="text-left px-6 py-3 font-semibold text-[#64748B] text-xs uppercase tracking-wider">Name</th>
                        <th className="text-left px-6 py-3 font-semibold text-[#64748B] text-xs uppercase tracking-wider">Email</th>
                        <th className="text-left px-6 py-3 font-semibold text-[#64748B] text-xs uppercase tracking-wider">Subject</th>
                        <th className="text-left px-6 py-3 font-semibold text-[#64748B] text-xs uppercase tracking-wider">Status</th>
                        <th className="text-left px-6 py-3 font-semibold text-[#64748B] text-xs uppercase tracking-wider">Date</th>
                        <th className="text-left px-6 py-3 font-semibold text-[#64748B] text-xs uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((c) => (
                        <tr key={c.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                          <td className="px-6 py-4 font-medium text-[#1C1917]">{c.name}</td>
                          <td className="px-6 py-4 text-[#64748B]">{c.email}</td>
                          <td className="px-6 py-4 text-[#64748B]">{c.subject || '—'}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.status === 'new' ? 'bg-blue-50 text-blue-700' : c.status === 'read' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                              {c.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[#94A3B8] text-xs">{new Date(c.createdAt).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              {c.status === 'new' && (
                                <button onClick={() => updateStatus.mutate({ id: c.id, status: 'read' })} className="text-xs text-[#1A3A5C] hover:text-[#D4A853]">Mark Read</button>
                              )}
                              <button onClick={() => { if (confirm('Delete this submission?')) deleteContact.mutate({ id: c.id }); }} className="text-xs text-red-500 hover:text-red-700">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center border border-[#E2E8F0]">
                <p className="text-[#94A3B8]">No contact submissions yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {tab === 'settings' && (
          <div>
            <h2 className="text-2xl font-semibold text-[#1C1917] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Site Settings</h2>
            <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] p-8 max-w-2xl">
              <div className="space-y-6">
                {[
                  { key: 'site_title', label: 'Site Title', placeholder: 'Nueve Technologies' },
                  { key: 'tagline', label: 'Tagline', placeholder: 'Ideas . People . Technology . Service' },
                  { key: 'contact_email', label: 'Contact Email', placeholder: 'info@nuevetech.io' },
                  { key: 'partnerships_email', label: 'Partnerships Email', placeholder: 'partnerships@nuevetech.io' },
                  { key: 'meta_description', label: 'Meta Description', placeholder: 'Site description for SEO' },
                ].map((s) => (
                  <div key={s.key}>
                    <label className="block text-xs font-medium text-[#64748B] mb-1.5">{s.label}</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        defaultValue={getSetting(s.key)}
                        onBlur={(e) => { if (e.target.value) upsertSetting.mutate({ key: s.key, value: e.target.value }); }}
                        placeholder={s.placeholder}
                        className="flex-1 px-4 py-2.5 rounded-md border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]/20 focus:border-[#1A3A5C]"
                      />
                      {getSetting(s.key) && <span className="text-xs text-green-600 flex items-center">Saved</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
