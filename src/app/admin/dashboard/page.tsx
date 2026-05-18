'use client';

import { useState, useEffect } from 'react';
import { Settings, Route, Image as ImageIcon, LogOut, Plus, Trash2, Save, Phone, Mail } from 'lucide-react';

type Tab = 'settings' | 'routes' | 'gallery' | 'extras';

interface RoutePrice {
  id: number;
  from: string;
  to: string;
  price: number;
  currency: string;
}

interface ExtraService {
  id: number;
  name: string;
  image: string;
  price: number;
  currency: string;
  is_active: boolean;
}

interface GalleryItem {
  id: number;
  url: string;
  type: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('settings');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Settings
  const [phone, setPhone] = useState('05323591039');
  const [email, setEmail] = useState('Primaviptransfer@gmail.com');

  // Routes
  const [routes, setRoutes] = useState<RoutePrice[]>([]);
  const [newRoute, setNewRoute] = useState({ from: 'Antalya Havalimanı', to: '', price: 0, currency: 'EUR' });

  // Gallery
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [newGallery, setNewGallery] = useState({ url: '', type: 'image' });

  // Extras
  const [extras, setExtras] = useState<ExtraService[]>([]);
  const [newExtra, setNewExtra] = useState({ name: '', image: '', price: 0, currency: 'EUR', is_active: true });

  // Auth check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        window.location.href = '/admin';
      }
    }
  }, []);

  // Load data
  useEffect(() => {
    fetchSettings();
    fetchRoutes();
    fetchGallery();
    fetchExtras();
  }, []);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // Settings
  const fetchSettings = async () => {
    const res = await fetch('/api/admin/settings');
    const data = await res.json();
    if (data.phone) setPhone(data.phone);
    if (data.email) setEmail(data.email);
  };

  const saveSettings = async () => {
    setLoading(true);
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, email }),
    });
    setLoading(false);
    showMessage('Ayarlar kaydedildi!');
  };

  // Routes
  const fetchRoutes = async () => {
    const res = await fetch('/api/admin/routes');
    const data = await res.json();
    if (Array.isArray(data)) setRoutes(data);
  };

  const addRoute = async () => {
    if (!newRoute.to || newRoute.price <= 0) return;
    setLoading(true);
    await fetch('/api/admin/routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRoute),
    });
    setNewRoute({ from: 'Antalya Havalimanı', to: '', price: 0, currency: 'EUR' });
    await fetchRoutes();
    setLoading(false);
    showMessage('Rota eklendi!');
  };

  const deleteRoute = async (id: number) => {
    if (!confirm('Bu rotayı silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/admin/routes?id=${id}`, { method: 'DELETE' });
    await fetchRoutes();
    showMessage('Rota silindi!');
  };

  // Gallery
  const fetchGallery = async () => {
    const res = await fetch('/api/admin/gallery');
    const data = await res.json();
    if (Array.isArray(data)) setGalleryItems(data);
  };

  const addGallery = async () => {
    if (!newGallery.url) return;
    setLoading(true);
    await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGallery),
    });
    setNewGallery({ url: '', type: 'image' });
    await fetchGallery();
    setLoading(false);
    showMessage('Galeri öğesi eklendi!');
  };

  const deleteGallery = async (id: number) => {
    if (!confirm('Bu öğeyi silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/admin/gallery?id=${id}`, { method: 'DELETE' });
    await fetchGallery();
    showMessage('Galeri öğesi silindi!');
  };

  // Extras
  const fetchExtras = async () => {
    const res = await fetch('/api/admin/extras');
    const data = await res.json();
    if (Array.isArray(data)) setExtras(data);
  };

  const addExtra = async () => {
    if (!newExtra.name || newExtra.price < 0) return;
    setLoading(true);
    await fetch('/api/admin/extras', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExtra),
    });
    setNewExtra({ name: '', image: '', price: 0, currency: 'EUR', is_active: true });
    await fetchExtras();
    setLoading(false);
    showMessage('Ekstra hizmet eklendi!');
  };

  const deleteExtra = async (id: number) => {
    if (!confirm('Bu ekstra hizmeti silmek istediğinize emin misiniz?')) return;
    await fetch(`/api/admin/extras?id=${id}`, { method: 'DELETE' });
    await fetchExtras();
    showMessage('Ekstra hizmet silindi!');
  };

  const toggleExtra = async (extra: ExtraService) => {
    setLoading(true);
    await fetch('/api/admin/extras', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...extra, is_active: !extra.is_active }),
    });
    await fetchExtras();
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin';
  };

  const tabs = [
    { id: 'settings' as Tab, label: 'İletişim Ayarları', icon: Settings },
    { id: 'routes' as Tab, label: 'Fiyat / Rotalar', icon: Route },
    { id: 'extras' as Tab, label: 'Ekstralar', icon: Plus },
    { id: 'gallery' as Tab, label: 'Galeri Yönetimi', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Top Bar */}
      <div className="bg-primary border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">
          Prima <span className="text-gold">VIP</span> Admin
        </h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
          <LogOut size={18} />
          <span className="text-sm">Çıkış</span>
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="bg-green-900/40 border border-green-700 text-green-400 px-6 py-3 text-sm text-center">
          {message}
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-primary border-r border-gray-800 p-4">
          <nav className="flex md:flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full text-left ${
                  activeTab === tab.id
                    ? 'bg-gold/10 text-gold border border-gold/30'
                    : 'text-gray-400 hover:text-white hover:bg-secondary'
                }`}
              >
                <tab.icon size={18} />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-8">

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold text-white mb-6">İletişim Ayarları</h2>
              <p className="text-gray-400 text-sm mb-8">Bu bilgiler sitenin tamamında görüntülenir ve WhatsApp yönlendirmelerinde kullanılır.</p>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Phone size={14} /> Telefon Numarası:
                  </label>
                  <input
                    type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <Mail size={14} /> E-posta Adresi:
                  </label>
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-secondary border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  />
                </div>
                <button
                  onClick={saveSettings}
                  disabled={loading}
                  className="flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  <Save size={18} />
                  {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </div>
          )}

          {/* Routes Tab */}
          {activeTab === 'routes' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Fiyat Listesi / Rotalar</h2>

              {/* Add new */}
              <div className="bg-secondary border border-gray-800 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Yeni Rota Ekle</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <input
                    type="text" value={newRoute.from} onChange={(e) => setNewRoute({ ...newRoute, from: e.target.value })}
                    placeholder="Nereden"
                    className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  />
                  <input
                    type="text" value={newRoute.to} onChange={(e) => setNewRoute({ ...newRoute, to: e.target.value })}
                    placeholder="Nereye"
                    className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  />
                  <input
                    type="number" value={newRoute.price} onChange={(e) => setNewRoute({ ...newRoute, price: parseFloat(e.target.value) })}
                    placeholder="Fiyat"
                    className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  />
                  <select
                    value={newRoute.currency} onChange={(e) => setNewRoute({ ...newRoute, currency: e.target.value })}
                    className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="TRY">TRY (₺)</option>
                  </select>
                  <button
                    onClick={addRoute} disabled={loading}
                    className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-bold rounded-lg transition-colors"
                  >
                    <Plus size={18} /> Ekle
                  </button>
                </div>
              </div>

              {/* Route List */}
              <div className="space-y-3">
                {routes.length === 0 && (
                  <p className="text-gray-500 text-center py-8">Henüz rota eklenmemiş.</p>
                )}
                {routes.map((r) => (
                  <div key={r.id} className="bg-secondary border border-gray-800 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 text-sm">{r.from}</span>
                      <span className="text-gold">→</span>
                      <span className="text-white font-medium">{r.to}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gold font-bold">{r.price} {r.currency === 'EUR' ? '€' : r.currency === 'USD' ? '$' : r.currency === 'GBP' ? '£' : '₺'}</span>
                      <button onClick={() => deleteRoute(r.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Galeri Yönetimi</h2>

              {/* Add new */}
              <div className="bg-secondary border border-gray-800 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Yeni Görsel / Video Ekle</h3>
                <p className="text-gray-400 text-sm mb-4">Görsel URL'si girin (Supabase Storage veya harici link). Maks. 5MB.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="url" value={newGallery.url} onChange={(e) => setNewGallery({ ...newGallery, url: e.target.value })}
                    placeholder="https://... görsel veya video URL"
                    className="md:col-span-1 bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  />
                  <select
                    value={newGallery.type} onChange={(e) => setNewGallery({ ...newGallery, type: e.target.value })}
                    className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  >
                    <option value="image">Resim</option>
                    <option value="video">Video</option>
                  </select>
                  <button
                    onClick={addGallery} disabled={loading}
                    className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-bold rounded-lg transition-colors py-3"
                  >
                    <Plus size={18} /> Ekle
                  </button>
                </div>
              </div>

              {/* Gallery Items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {galleryItems.length === 0 && (
                  <p className="text-gray-500 text-center py-8 col-span-3">Henüz galeri öğesi eklenmemiş.</p>
                )}
                {galleryItems.map((item) => (
                  <div key={item.id} className="bg-secondary border border-gray-800 rounded-xl overflow-hidden">
                    {item.type === 'image' ? (
                      <img src={item.url} alt="" className="w-full h-48 object-cover" />
                    ) : (
                      <video src={item.url} className="w-full h-48 object-cover" controls preload="metadata" />
                    )}
                    <div className="p-3 flex items-center justify-between">
                      <span className="text-xs text-gray-400 truncate flex-1">{item.url}</span>
                      <button onClick={() => deleteGallery(item.id)} className="text-red-400 hover:text-red-300 ml-2">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extras Tab */}
          {activeTab === 'extras' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Ekstra Hizmetler (Kutlama, İçecek vb.)</h2>

              {/* Add new */}
              <div className="bg-secondary border border-gray-800 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Yeni Ekstra Ekle</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <input
                    type="text" value={newExtra.name} onChange={(e) => setNewExtra({ ...newExtra, name: e.target.value })}
                    placeholder="Adı (Örn: Çiçek, Viski)"
                    className="col-span-1 md:col-span-2 bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  />
                  <input
                    type="number" value={newExtra.price} onChange={(e) => setNewExtra({ ...newExtra, price: parseFloat(e.target.value) })}
                    placeholder="Fiyat"
                    className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  />
                  <select
                    value={newExtra.currency} onChange={(e) => setNewExtra({ ...newExtra, currency: e.target.value })}
                    className="bg-zinc-900 border border-gray-700 text-white rounded-lg p-3 outline-none focus:border-gold"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="TRY">TRY (₺)</option>
                  </select>
                  <button
                    onClick={addExtra} disabled={loading}
                    className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-bold rounded-lg transition-colors py-3"
                  >
                    <Plus size={18} /> Ekle
                  </button>
                </div>
              </div>

              {/* Extra List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {extras.length === 0 && (
                  <p className="text-gray-500 text-center py-8 col-span-full">Henüz ekstra hizmet eklenmemiş.</p>
                )}
                {extras.map((ex) => (
                  <div key={ex.id} className={`bg-secondary border rounded-lg p-4 flex flex-col justify-between ${ex.is_active ? 'border-gray-800' : 'border-red-900/50 opacity-50'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-white font-medium">{ex.name}</h4>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => toggleExtra(ex)}
                          className={`text-xs px-2 py-1 rounded ${ex.is_active ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}
                        >
                          {ex.is_active ? 'Aktif' : 'Pasif'}
                        </button>
                        <button onClick={() => deleteExtra(ex.id)} className="text-red-400 hover:text-red-300">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-gold font-bold text-lg">
                      {ex.price} {ex.currency === 'EUR' ? '€' : ex.currency === 'USD' ? '$' : ex.currency === 'GBP' ? '£' : '₺'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
