import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        <Navbar />
        <main className="pt-20">{children}</main>{" "}
        {/* Ensure padding is same as navbar height */}
        <Footer />
      </body>
    </html>
  );
}
