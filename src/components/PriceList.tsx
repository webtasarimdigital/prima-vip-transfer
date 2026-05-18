import { MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default async function PriceList() {
  const { data: routePrices } = await supabase.from('route_price').select('*').order('id');

  // Admin panelden veri girilene kadar şablon olarak gösterilecek veriler (Fallback)
  const fallbackPrices = [
    { id: 1, from: 'Antalya Havalimanı', to: 'Antalya Merkez', price: 40, currency: 'EUR' },
    { id: 2, from: 'Antalya Havalimanı', to: 'Belek', price: 45, currency: 'EUR' },
    { id: 3, from: 'Antalya Havalimanı', to: 'Kumköy', price: 50, currency: 'EUR' },
    { id: 4, from: 'Antalya Havalimanı', to: 'Evrenseki', price: 50, currency: 'EUR' },
    { id: 5, from: 'Antalya Havalimanı', to: 'Manavgat', price: 50, currency: 'EUR' },
    { id: 6, from: 'Antalya Havalimanı', to: 'Kızılağaç', price: 60, currency: 'EUR' },
    { id: 7, from: 'Antalya Havalimanı', to: 'İncekum', price: 70, currency: 'EUR' },
    { id: 8, from: 'Antalya Havalimanı', to: 'Türkler', price: 75, currency: 'EUR' },
    { id: 9, from: 'Antalya Havalimanı', to: 'Kargıcak', price: 90, currency: 'EUR' },
  ];

  const displayPrices = routePrices && routePrices.length > 0 ? routePrices : fallbackPrices;

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider inline-block relative pb-4">
            Fiyat Listesi
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gold"></div>
          </h2>
          {(!routePrices || routePrices.length === 0) && (
            <p className="text-gray-500 mt-4 text-sm">
              * Fiyatlar admin panelden eklendiğinde burada tam liste görüntülenecektir. Şimdilik örnek veriler gösteriliyor.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayPrices.map((item) => (
            <div 
              key={item.id} 
              className="bg-secondary/50 border border-gray-800 rounded-lg p-4 flex items-center justify-between hover:border-gold/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-500 group-hover:text-gold transition-colors">
                  <MapPin size={22} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">{item.from}</div>
                  <div className="text-sm font-semibold text-white">{item.to}</div>
                </div>
              </div>
              <div className="text-lg font-bold text-gold">
                {item.price} {item.currency === 'EUR' ? '€' : item.currency === 'USD' ? '$' : item.currency === 'GBP' ? '£' : '₺'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
