import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import   Navbar  from "@/components/Navbar";
import   Footer  from "@/components/Footer";


export const metadata: Metadata = {
  title: "Car Hub",
  description: "Discover the best cars in the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative bg-luxury-bg text-luxury-text">
         <Toaster position="top-right" toastOptions={{
            duration: 3000,
          }} />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
