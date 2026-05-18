import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp({ phone }: { phone: string }) {
  const waNumber = phone.replace(/\D/g, '');
  
  return (
    <a
      href={`https://wa.me/${waNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-bounce-slow"
      aria-label="WhatsApp Contact"
    >
      <MessageCircle size={32} />
    </a>
  );
}
