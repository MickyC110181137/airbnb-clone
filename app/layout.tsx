import type { Metadata } from 'next';
import './globals.css';

import { Nunito } from 'next/font/google';
import Navbar from './component/navbar/Navbar';
import ClientOnly from './component/ClientOnly';
import RegisterModal from './component/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './component/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './component/modals/RentModal';
import SearchModal from './component/modals/SearchModal';

const font = Nunito({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Airbnbp',
  description: 'Airbnb clone',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar currentUser={currentUser} />
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
