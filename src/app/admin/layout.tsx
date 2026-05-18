import '../globals.css';

export const metadata = {
  title: 'Admin Panel | Prima VIP Transfer',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-zinc-950 text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
