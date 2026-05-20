import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export default function DashboardLayout ({ children }) {
  return (
    <html lang="en" className={` h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
