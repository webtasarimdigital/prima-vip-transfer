import { ShieldCheck, Clock, Star, Users, Award, Car } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Hakkımızda | Prima VIP Transfer',
  description: 'Antalya VIP transfer hizmeti sunan Prima VIP Transfer hakkında bilgi edinin. Lüks araçlar, profesyonel şoförler, 7/24 hizmet.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-b from-black to-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider">
            Hakkımızda
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Yılların deneyimiyle Antalya'da premium VIP transfer hizmetleri sunuyoruz.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative rounded-xl overflow-hidden aspect-video">
              <Image
                src="/prima-vip-araclar.jpeg"
                alt="Prima VIP Transfer Araçları"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Prima <span className="text-gold">VIP</span> Transfer
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Antalya Havalimanı başta olmak üzere tüm turistik bölgelere VIP transfer hizmeti sunmaktayız. 
                Müşterilerimizin konforunu ve güvenliğini ön planda tutarak, lüks araçlarımız ve profesyonel 
                şoförlerimizle kesintisiz ulaşım çözümleri sağlıyoruz.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Her yolcumuza özel ilgi göstererek, havalimanı karşılama, otel transferi, şehirlerarası 
                ulaşım ve özel tur organizasyonları düzenliyoruz. Araçlarımızda Wi-Fi, soğuk içecek, 
                atıştırmalık ve bebek koltuğu gibi ek hizmetler sunulmaktadır.
              </p>
              <p className="text-gray-400 leading-relaxed">
                7/24 hizmet anlayışımızla, siz seyahatinizin keyfini çıkarırken biz her detayla ilgileniyoruz.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <div className="bg-secondary rounded-xl p-8 text-center border border-gray-800">
              <div className="text-4xl font-bold text-gold mb-2">5000+</div>
              <div className="text-gray-400 text-sm">Mutlu Müşteri</div>
            </div>
            <div className="bg-secondary rounded-xl p-8 text-center border border-gray-800">
              <div className="text-4xl font-bold text-gold mb-2">10+</div>
              <div className="text-gray-400 text-sm">Lüks Araç</div>
            </div>
            <div className="bg-secondary rounded-xl p-8 text-center border border-gray-800">
              <div className="text-4xl font-bold text-gold mb-2">7/24</div>
              <div className="text-gray-400 text-sm">Hizmet</div>
            </div>
            <div className="bg-secondary rounded-xl p-8 text-center border border-gray-800">
              <div className="text-4xl font-bold text-gold mb-2">35+</div>
              <div className="text-gray-400 text-sm">Rota</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Users className="text-gold" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Profesyonel Ekip</h3>
                <p className="text-gray-400 text-sm">Deneyimli, güler yüzlü ve profesyonel şoförlerimiz sizi güvenle taşır.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Award className="text-gold" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Kalite Garantisi</h3>
                <p className="text-gray-400 text-sm">Her aracımız düzenli bakım ve temizlik süreçlerinden geçmektedir.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                <Car className="text-gold" size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Geniş Araç Filosu</h3>
                <p className="text-gray-400 text-sm">Sedan'dan VIP minibüse kadar her ihtiyaca uygun araç seçenekleri.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
