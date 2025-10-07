import type { Metadata } from "next";
import "./globals.css";

import { Nunito } from "next/font/google";
import Navbar from "./component/navbar/Navbar";
import ClientOnly from "./component/ClientOnly";
import Modal from "./component/modals/modal";

const font = Nunito({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Airbnbp",
  description: "Airbnb clone", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Modal title="Hello world" isOpen />
          <Navbar />
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
