import Image from 'next/image';

export const metadata = {
  title: 'Foto Galeri | Prima VIP Transfer',
  description: 'Prima VIP Transfer lüks araç filomuzu ve hizmetlerimizi görsellerle keşfedin.',
};

const GALLERY_ITEMS = [
  { id: 1, src: '/prima-vip-arac.jpeg', type: 'image' as const, alt: 'Prima VIP Transfer Araç' },
  { id: 2, src: '/prima-vip-araclar.jpeg', type: 'image' as const, alt: 'Prima VIP Transfer Araçlar' },
  { id: 3, src: '/prima-vip-arac-ici.jpeg', type: 'image' as const, alt: 'Prima VIP Transfer Araç İçi' },
  { id: 4, src: '/prima-vip-arac-ici-detay.jpeg', type: 'image' as const, alt: 'Prima VIP Transfer Araç İçi Detay' },
  { id: 5, src: '/prima-vip-tanitim.mp4', type: 'video' as const, alt: 'Prima VIP Transfer Tanıtım Videosu' },
];

export default function GalleryPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-b from-black to-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wider">
            Foto Galeri
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lüks araç filomuzu ve hizmetlerimizi yakından keşfedin.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <div key={item.id} className="relative rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 transition-colors group">
                {item.type === 'image' ? (
                  <div className="aspect-video relative">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <video
                    controls
                    preload="metadata"
                    className="w-full aspect-video object-cover"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
