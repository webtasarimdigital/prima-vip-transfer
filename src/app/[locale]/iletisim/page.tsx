import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'İletişim | Prima VIP Transfer',
  description: 'Prima VIP Transfer ile iletişime geçin. Antalya VIP transfer rezervasyonu için 7/24 WhatsApp ve telefon desteği.',
};

export default function ContactPage() {
  const phone = '05323591039';
  const email = 'Primaviptransfer@gmail.com';
  const waNumber = phone.replace(/\D/g, '');

  return (
    <div className="pt-24 pb-20">
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-b from-black to-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider">
            İletişim
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Bize 7/24 ulaşabilirsiniz. Tüm iletişim WhatsApp üzerinden gerçekleştirilmektedir.
          </p>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* WhatsApp - Primary Contact */}
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366]/10 border-2 border-[#25D366]/40 hover:border-[#25D366] rounded-xl p-8 flex flex-col items-center text-center transition-all hover:scale-105"
            >
              <div className="w-20 h-20 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="text-[#25D366]" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">WhatsApp</h3>
              <p className="text-gray-400 mb-4">7/24 hızlı iletişim ve kolay rezervasyon</p>
              <span className="text-[#25D366] font-bold text-lg">{phone}</span>
            </a>
            
            {/* Phone */}
            <a
              href={`tel:${phone}`}
              className="bg-gold/5 border-2 border-gold/30 hover:border-gold rounded-xl p-8 flex flex-col items-center text-center transition-all hover:scale-105"
            >
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <Phone className="text-gold" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Telefon</h3>
              <p className="text-gray-400 mb-4">Bizi doğrudan arayabilirsiniz</p>
              <span className="text-gold font-bold text-lg">{phone}</span>
            </a>
            
            {/* Email - info only */}
            <div className="bg-secondary border border-gray-800 rounded-xl p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <Mail className="text-gold" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">E-posta</h3>
              <p className="text-gray-400 mb-4">Bilgi amaçlı iletişim</p>
              <span className="text-gold font-bold">{email}</span>
            </div>
            
            {/* Address */}
            <div className="bg-secondary border border-gray-800 rounded-xl p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <MapPin className="text-gold" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Adres</h3>
              <p className="text-gray-400 mb-4">Operasyon merkezi</p>
              <span className="text-gold font-bold">Antalya Havalimanı, Muratpaşa / Antalya</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
