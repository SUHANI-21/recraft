import { Inter } from 'next/font/google'; // This line should already be there
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

// --- THIS LINE WAS MISSING ---
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Recraft - Sustainable Marketplace',
  description: 'Handmade products from 100% recycled materials.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="main-content-area">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}