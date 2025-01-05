import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/ui/Footer";
import Banner from "@/components/ui/Banner";
import { ReactLenis } from "@/lib/utilities/lenis";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Aucsome",
  description: "An auction platform where you can bid on stuff!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactLenis root>
        <body className={`${inter.className} antialiased overflow-x-hidden`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Banner />
            <Navbar />
            <main className="mx-auto max-w-[80rem] grid px-2">{children}</main>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </ReactLenis>
    </html>
  );
}
