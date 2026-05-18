import { useTranslations } from 'next-intl';
import Hero from '@/components/Hero';
import PriceList from '@/components/PriceList';
import { ShieldCheck, Clock, Star } from 'lucide-react';

export default function Home() {
  const t = useTranslations('Home');

  return (
    <>
      <Hero />
      
      {/* About Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider inline-block relative pb-4 mb-6">
              {t('aboutTitle')}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gold"></div>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t('aboutText')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary p-8 rounded-xl text-center border border-gray-800 hover:border-gold/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Güvenli Seyahat</h3>
              <p className="text-gray-400">Deneyimli şoförlerimiz ve periyodik bakımı yapılan araçlarımızla güvenliğiniz önceliğimizdir.</p>
            </div>
            
            <div className="bg-secondary p-8 rounded-xl text-center border border-gray-800 hover:border-gold/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <Clock size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Zamanında Teslim</h3>
              <p className="text-gray-400">Sizi istediğiniz noktadan tam zamanında alıp, gideceğiniz yere vaktinde ulaştırıyoruz.</p>
            </div>
            
            <div className="bg-secondary p-8 rounded-xl text-center border border-gray-800 hover:border-gold/50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <Star size={32} className="text-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">VIP Konfor</h3>
              <p className="text-gray-400">Ultra lüks tasarımlı araçlarımızda yolculuğun tadını çıkarırken, Wi-Fi ve ikramlarımızdan faydalanın.</p>
            </div>
          </div>
        </div>
      </section>

      <PriceList />
      
      {/* Fake Reviews Section */}
      <section className="py-20 bg-primary border-t border-gray-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider inline-block relative pb-4">
              {t('reviewsTitle')}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gold"></div>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black p-6 rounded-xl border border-gray-800">
              <div className="flex text-gold mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 italic mb-6">"Our driver was waiting for us at the airport holding a sign. The Maybach was incredibly clean and the drinks were a nice touch. Best transfer in Antalya!"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center font-bold text-xl text-gray-400">M</div>
                <div>
                  <h4 className="text-white font-bold">Michael Schmidt</h4>
                  <span className="text-sm text-gray-500">Berlin, Germany</span>
                </div>
              </div>
            </div>

            <div className="bg-black p-6 rounded-xl border border-gray-800">
              <div className="flex text-gold mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 italic mb-6">"I usually use standard taxis, but trying Prima VIP changed my mind. Extremely professional, punctual, and the luxury van made us feel like celebrities."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center font-bold text-xl text-gray-400">E</div>
                <div>
                  <h4 className="text-white font-bold">Elena Ivanova</h4>
                  <span className="text-sm text-gray-500">Moscow, Russia</span>
                </div>
              </div>
            </div>

            <div className="bg-black p-6 rounded-xl border border-gray-800">
              <div className="flex text-gold mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 italic mb-6">"Fantastic experience from start to finish. The booking via WhatsApp was so easy and the vehicle condition exceeded our expectations. Highly recommend!"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center font-bold text-xl text-gray-400">J</div>
                <div>
                  <h4 className="text-white font-bold">James Wilson</h4>
                  <span className="text-sm text-gray-500">London, UK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
