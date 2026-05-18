import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  const messages = await getMessages();

  // TODO: Fetch from Supabase settings table later
  const phone = '05323591039';
  const email = 'Primaviptransfer@gmail.com';
 
  return (
    <html lang={locale}>
      <body className="bg-zinc-950 text-white font-sans antialiased relative pb-16 md:pb-0">
        <NextIntlClientProvider messages={messages}>
          <Header phone={phone} />
          
          <main className="min-h-screen">
            {children}
          </main>
          
          <Footer phone={phone} email={email} />
          <MobileNav phone={phone} />
          <FloatingWhatsApp phone={phone} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
