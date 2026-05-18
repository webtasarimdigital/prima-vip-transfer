'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

const VEHICLES = [
  {
    id: 1,
    name: 'VIP SEDAN (1-3) PAX',
    pax: 3,
    luggage: 3,
    image: '/prima-vip-arac.jpeg',
    features: ['Atıştırmalık', 'Soğuk İçecekler (Alkolsüz)', 'Wifi', 'Bebek Koltuğu', 'Lüks Dizayn Araç', 'Kaptan ile bağlantı yok'],
    description: 'Konforlu ve şık sedan aracımız ile VIP transfer deneyimi.'
  },
  {
    id: 2,
    name: 'VIP EXCLUSIVE (1-6) PAX',
    pax: 6,
    luggage: 6,
    image: '/prima-vip-arac-ici.jpeg',
    features: ['Atıştırmalık', 'Soğuk İçecekler (Alkolsüz)', 'Wifi', 'Bebek Koltuğu', 'Lüks Dizayn Araç', 'Kaptan ile bağlantı yok'],
    description: 'Ultra lüks tasarıma sahip Mercedes Vito aracımız ile özel hissettiren transfer.'
  },
  {
    id: 3,
    name: 'ROYAL CLASS VIP (1-6) PAX',
    pax: 6,
    luggage: 6,
    image: '/prima-vip-arac-ici-detay.jpeg',
    features: ['Atıştırmalık', 'Soğuk İçecekler (Alkolsüz)', 'Sürpriz İkramlar', 'Wifi', 'Bebek Koltuğu', 'Lüks Dizayn Araç', 'Kaptan ile bağlantı yok'],
    description: 'Kraliyet sınıfı konfor ve prestij arayanlar için en üst seviye donanımlı Vito.'
  },
  {
    id: 4,
    name: 'VIP MINIBÜS (1-14) PAX',
    pax: 14,
    luggage: 14,
    image: '/prima-vip-araclar.jpeg',
    features: ['Atıştırmalık', 'Soğuk İçecekler (Alkolsüz)', 'Grup Transferine Uygun', 'Wifi', 'Bebek Koltuğu', 'Geniş Bagaj Alanı'],
    description: 'Kalabalık gruplar ve aileler için geniş, konforlu ve güvenli Sprinter minibüsümüz.'
  }
];

const ROUTE_INFO: Record<string, { km: string, duration: string }> = {
  'Antalya Merkez': { km: '18 KM', duration: '20 DK' },
  'Lara': { km: '12 KM', duration: '15 DK' },
  'Kundu': { km: '14 KM', duration: '15 DK' },
  'Kaleiçi': { km: '16 KM', duration: '20 DK' },
  'Konyaaltı': { km: '22 KM', duration: '25 DK' },
  'Belek': { km: '33 KM', duration: '30 DK' },
  'Boğazkent': { km: '38 KM', duration: '35 DK' },
  'Denizyaka': { km: '45 KM', duration: '40 DK' },
  'Kumköy': { km: '60 KM', duration: '50 DK' },
  'Gündoğdu': { km: '62 KM', duration: '50 DK' },
  'Çolaklı': { km: '63 KM', duration: '50 DK' },
  'Evrenseki': { km: '65 KM', duration: '50 DK' },
  'Side': { km: '65 KM', duration: '55 DK' },
  'Sorgun': { km: '68 KM', duration: '55 DK' },
  'Manavgat': { km: '75 KM', duration: '60 DK' },
  'Titreyengöl': { km: '70 KM', duration: '55 DK' },
  'Kızılot': { km: '85 KM', duration: '65 DK' },
  'Kızılağaç': { km: '90 KM', duration: '70 DK' },
  'Okurcalar': { km: '100 KM', duration: '75 DK' },
  'Avsallar': { km: '110 KM', duration: '80 DK' },
  'İncekum': { km: '105 KM', duration: '80 DK' },
  'Çenger': { km: '108 KM', duration: '80 DK' },
  'Konaklı': { km: '115 KM', duration: '85 DK' },
  'Türkler': { km: '118 KM', duration: '85 DK' },
  'Alanya': { km: '125 KM', duration: '90 DK' },
  'Mahmutlar': { km: '140 KM', duration: '100 DK' },
  'Kargıcak': { km: '145 KM', duration: '105 DK' },
  'Kestel': { km: '135 KM', duration: '95 DK' },
  'Beldibi': { km: '40 KM', duration: '35 DK' },
  'Göynük': { km: '45 KM', duration: '40 DK' },
  'Kemer': { km: '50 KM', duration: '45 DK' },
  'Çamyuva': { km: '58 KM', duration: '50 DK' },
  'Kiriş': { km: '55 KM', duration: '48 DK' },
  'Tekirova': { km: '70 KM', duration: '60 DK' },
  'Olimpos': { km: '90 KM', duration: '75 DK' },
  'Adrasan': { km: '100 KM', duration: '85 DK' },
};

const FALLBACK_BASE_PRICES: Record<string, number> = {
  'Antalya Merkez': 40,
  'Lara': 40,
  'Kundu': 40,
  'Kaleiçi': 40,
  'Konyaaltı': 40,
  'Belek': 45,
  'Boğazkent': 45,
  'Denizyaka': 50,
  'Kumköy': 50,
  'Gündoğdu': 50,
  'Çolaklı': 50,
  'Evrenseki': 50,
  'Side': 50,
  'Sorgun': 50,
  'Manavgat': 50,
  'Titreyengöl': 50,
  'Kızılot': 60,
  'Kızılağaç': 60,
  'Okurcalar': 70,
  'Avsallar': 75,
  'İncekum': 70,
  'Çenger': 70,
  'Konaklı': 75,
  'Türkler': 75,
  'Alanya': 75,
  'Mahmutlar': 90,
  'Kargıcak': 90,
  'Kestel': 90,
  'Beldibi': 50,
  'Göynük': 50,
  'Kemer': 50,
  'Çamyuva': 55,
  'Kiriş': 55,
  'Tekirova': 60,
  'Olimpos': 85,
  'Adrasan': 95,
};

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const from = searchParams.get('from') || 'Antalya Havalimanı';
  const to = searchParams.get('to') || 'Antalya Merkez';
  const pax = parseInt(searchParams.get('pax') || '1');
  const currency = searchParams.get('currency') || 'EUR';

  const [direction, setDirection] = useState<'one-way' | 'round-trip'>('one-way');
  const [dbBasePrice, setDbBasePrice] = useState<number | null>(null);
  const [rates, setRates] = useState<Record<string, number>>({ EUR: 1, USD: 1.08, GBP: 0.85, TRY: 53.0 });

  useEffect(() => {
    // Fetch live rates from base EUR
    fetch('https://open.er-api.com/v6/latest/EUR')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates) {
          setRates(data.rates);
        }
      })
      .catch((err) => console.error('Döviz kuru yüklenemedi:', err));
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const { data, error } = await supabase
          .from('route_price')
          .select('price')
          .or(`and(from.eq."${from}",to.eq."${to}"),and(from.eq."${to}",to.eq."${from}")`)
          .limit(1);
        if (data && data.length > 0) {
          setDbBasePrice(data[0].price);
        }
      } catch (err) {
        console.error('Fiyat getirme hatası:', err);
      }
    };
    fetchPrice();
  }, [from, to]);

  const routeInfo = ROUTE_INFO[to] || { km: '- KM', duration: '- DK' };
  const currencySymbol: Record<string, string> = { EUR: '€', USD: '$', GBP: '£', TRY: '₺' };
  const filteredVehicles = VEHICLES.filter(v => v.pax >= pax);

  const handleSelect = (vehicleId: number, price: number) => {
    const params = new URLSearchParams({
      from,
      to,
      pax: pax.toString(),
      currency,
      direction,
      vehicleId: vehicleId.toString(),
      price: price.toString(),
    });
    router.push(`/rezervasyon/step-2?${params.toString()}` as any);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Steps indicator */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-4 max-w-lg mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gold text-black font-bold flex items-center justify-center">1</div>
            <span className="text-xs text-gold mt-2 font-medium">Araç Seçimi</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-700"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-700 text-gray-400 font-bold flex items-center justify-center">2</div>
            <span className="text-xs text-gray-500 mt-2">Rezervasyon</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="container mx-auto px-4 text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 inline-block relative pb-4">
          Lütfen Size Uygun Aracı Seçiniz
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gold"></div>
        </h1>
        <p className="text-gray-400 mt-4">
          Araçlarımız Konfor ve Donanım Seviyelerine Göre Sıralanmıştır.
        </p>
        <div className="text-sm text-gray-500 mt-2">
          {from} → {to} | {routeInfo.km} / {routeInfo.duration} | {pax} Kişi
        </div>
      </div>

      {/* Vehicle List */}
      <div className="container mx-auto px-4 lg:px-8 space-y-6">
        {filteredVehicles.map((vehicle, index) => {
          // Dynamic pricing base charges per vehicle class
          const extraCharges = [0, 5, 10, 20];
          const extraCharge = extraCharges[index] || 0;

          const baseEur = (dbBasePrice || FALLBACK_BASE_PRICES[to] || 40) + extraCharge;

          // Convert dynamically using fetched live rates
          const rate = rates[currency] || 1;
          const calculatedPrice = Math.round(baseEur * rate);

          const oneWayPrice = calculatedPrice;
          const roundTripPrice = calculatedPrice * 2;

          return (
            <div key={vehicle.id} className="bg-secondary border border-gray-800 rounded-xl p-6 hover:border-gold/40 transition-colors">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Vehicle Image */}
                <div className="relative w-full lg:w-72 h-48 rounded-lg overflow-hidden shrink-0">
                  <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" />
                </div>

                {/* Features */}
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-white mb-1 uppercase">
                    {vehicle.name} | <span className="text-gray-400 text-sm">🧳 {vehicle.luggage} Bagaj</span>
                  </h2>
                  <p className="text-sm text-gold mb-4">Araç Özellikleri ve fiyata dahil ücretsiz hizmetler</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {vehicle.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check size={14} className="text-gold shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  {vehicle.description && (
                    <p className="mt-4 text-sm text-gold/80 bg-gold/5 border border-gold/20 p-3 rounded-lg">{vehicle.description}</p>
                  )}
                </div>

                {/* Pricing */}
                <div className="flex flex-col items-center gap-3 lg:w-56 shrink-0">
                  <div className="flex gap-2 w-full">
                    <button 
                      onClick={() => setDirection('one-way')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold border transition-colors ${direction === 'one-way' ? 'bg-gold/10 border-gold text-gold' : 'border-gray-700 text-gray-400'}`}
                    >
                      <div className="text-xs mb-1">Tek Yön</div>
                      <div className="text-xl">{oneWayPrice} {currencySymbol[currency] || '€'}</div>
                    </button>
                    <button 
                      onClick={() => setDirection('round-trip')}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold border transition-colors ${direction === 'round-trip' ? 'bg-gold/10 border-gold text-gold' : 'border-gray-700 text-gray-400'}`}
                    >
                      <div className="text-xs mb-1">Gidiş / Dönüş</div>
                      <div className="text-xl">{roundTripPrice} {currencySymbol[currency] || '€'}</div>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center">Kişi Başı Değildir, Aracın Toplam Fiyatıdır.</p>
                  <button
                    onClick={() => handleSelect(vehicle.id, direction === 'one-way' ? oneWayPrice : roundTripPrice)}
                    className="w-full bg-gold hover:bg-gold-light text-black font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Check size={18} />
                    REZERVASYON
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
