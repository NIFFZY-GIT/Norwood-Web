import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar"; // Navbar is a client component itself
import Footer from "../components/Footer"; // Footer is a client component itself

export const metadata: Metadata = {
  title: "Norwood Empire",
  description: "Premium quality products with authenticity and taste.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground transition-all">
        <Navbar /> {/* Navbar is a Client Component */}
        <main className="pt-20">{children}</main>
        <Footer /> {/* Footer is a Client Component */}
      </body>
    </html>
  );
}
