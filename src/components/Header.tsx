'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header({ phone }: { phone: string }) {
  const t = useTranslations('Navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = useLocale();

  const locales = [
    { code: 'tr', flag: '/turkey.svg', label: 'TR' },
    { code: 'en', flag: '/england.svg', label: 'EN' },
    { code: 'de', flag: '/germanyc.svg', label: 'DE' },
    { code: 'ru', flag: '/flag-of-russia.svg', label: 'RU' },
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/prima-vip-logo.png" alt="Prima VIP Transfer" className="h-10 md:h-14 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-200 hover:text-gold transition-colors">{t('home')}</Link>
            <Link href="/hakkimizda" className="text-sm font-medium text-gray-200 hover:text-gold transition-colors">{t('about')}</Link>
            <Link href="/rezervasyon" className="text-sm font-medium text-gray-200 hover:text-gold transition-colors">{t('reservation')}</Link>
            <Link href="/galeri" className="text-sm font-medium text-gray-200 hover:text-gold transition-colors">{t('gallery')}</Link>
            <Link href="/iletisim" className="text-sm font-medium text-gray-200 hover:text-gold transition-colors">{t('contact')}</Link>
          </nav>

          {/* Right Section: Phone & Lang */}
          <div className="hidden md:flex items-center gap-6">
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors">
              <Phone size={18} />
              <span>{phone}</span>
            </a>
            
            {/* Lang Switcher (Flags) */}
            <div className="flex items-center gap-3 border-l border-gray-700 pl-6">
              {locales.map((l) => (
                <Link 
                  key={l.code} 
                  href={pathname} 
                  locale={l.code as any}
                  className={`transition-transform hover:scale-110 ${currentLocale !== l.code ? 'opacity-50 hover:opacity-100' : 'scale-110 shadow-[0_0_10px_rgba(212,175,55,0.5)] rounded-sm'}`}
                  title={l.label}
                >
                  <img src={l.flag} alt={l.label} className="w-6 h-4 object-cover rounded-sm" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-200 hover:text-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary border-b border-gold/20 py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link href="/" className="text-base font-medium text-gray-200 hover:text-gold">{t('home')}</Link>
            <Link href="/hakkimizda" className="text-base font-medium text-gray-200 hover:text-gold">{t('about')}</Link>
            <Link href="/rezervasyon" className="text-base font-medium text-gray-200 hover:text-gold">{t('reservation')}</Link>
            <Link href="/galeri" className="text-base font-medium text-gray-200 hover:text-gold">{t('gallery')}</Link>
            <Link href="/iletisim" className="text-base font-medium text-gray-200 hover:text-gold">{t('contact')}</Link>
            
            <hr className="border-gold/20 my-2" />
            
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-gold font-semibold">
              <Phone size={18} />
              <span>{phone}</span>
            </a>
            
            <div className="flex items-center justify-center gap-6 mt-4 p-4 bg-secondary rounded-lg">
              {locales.map((l) => (
                <Link 
                  key={l.code} 
                  href={pathname} 
                  locale={l.code as any}
                  className={`transition-transform hover:scale-110 ${currentLocale !== l.code ? 'opacity-50 hover:opacity-100' : 'scale-125 shadow-[0_0_10px_rgba(212,175,55,0.5)] rounded-sm'}`}
                >
                  <img src={l.flag} alt={l.label} className="w-8 h-5.5 object-cover rounded-sm" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
