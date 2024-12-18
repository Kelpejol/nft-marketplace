import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import LandingPageFooter from "./components/landingPage/LandingPageFooter";
import CreateNftModal from "./components/modals/CreateNftModal";
import CreateListingModal from "./components/modals/CreateListingModal";
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import { queryClient } from "./queryClient";
import WalletToast from "./components/WalletToast";
import { Dialog } from "./components/modals/Dialog";
import BuyModal from "./components/modals/BuyModal";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "thirdweb SDK + Next starter",
  description:
    "Starter template for using thirdweb SDK with Next.js App router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          <QueryClientProvider client={queryClient}>
          {children}
          </QueryClientProvider>
          <CreateNftModal/>
          <CreateListingModal/>
          <Dialog
          content="Who are you buying this art for ? if you 'Click yes'"
          hasButton
          />
          <BuyModal/>
           <WalletToast/>
          <LandingPageFooter/>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
