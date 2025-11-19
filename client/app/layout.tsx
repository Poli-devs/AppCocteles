import "./globals.css";
import Navbar from "@/components/Navbar";

// Metadatos de la aplicación
export const metadata = {
  title: "App de Cócteles",
  description: "Prueba técnica - Next.js + Node.js",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍹</text></svg>",
      },
    ],
  },
};

// Layout principal de la aplicación con navegación
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
