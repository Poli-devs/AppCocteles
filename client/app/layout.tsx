import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "App de Cócteles",
  description: "Prueba técnica - Next.js + Node.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 min-h-screen">
        <Navbar />
        <main className="container mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
