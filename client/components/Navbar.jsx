"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Componente de navegación principal de la aplicación
export default function Navbar() {
    const pathname = usePathname();

    // Determina si una ruta está activa para resaltar el enlace
    const isActive = (path) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };

    // Renderiza la barra de navegación con enlaces a las páginas principales
    return (
        <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold hover:text-blue-200 transition">
                Cócteles App
            </Link>
            
            <div className="flex gap-4">
                <Link
                href="/"
                prefetch={true}
                className={`px-4 py-2 rounded transition ${
                    isActive("/") && pathname === "/"
                    ? "bg-blue-800 font-semibold"
                    : "hover:bg-blue-700"
                }`}
                >
                Inicio
                </Link>
                
                <Link
                href="/favoritos"
                prefetch={true}
                className={`px-4 py-2 rounded transition ${
                    isActive("/favoritos")
                    ? "bg-blue-800 font-semibold"
                    : "hover:bg-blue-700"
                }`}
                >
                Favoritos
                </Link>
                
                <Link
                href="/agregar"
                prefetch={true}
                className={`px-4 py-2 rounded transition ${
                    isActive("/agregar")
                    ? "bg-blue-800 font-semibold"
                    : "hover:bg-blue-700"
                }`}
                >
                Agregar Cóctel
                </Link>
            </div>
            </div>
        </div>
        </nav>
    );
}
