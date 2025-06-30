import NavBar from './components/NavBar';
import './globals.css';

export const metadata = {
  title: 'User Manager',
  description: 'Next.js + Tailwind + Proxy backend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <NavBar />
        <div className="max-w-2xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}