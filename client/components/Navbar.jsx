"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path) => {
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold"> Cócteles App</h1>
            
            <div className="flex gap-4">
                <Link
                href="/"
                className={`px-4 py-2 rounded transition ${
                    isActive("/") && pathname === "/"
                    ? "bg-blue-800 font-semibold"
                    : "hover:bg-blue-700"
                }`}
                >
                Inicio
                </Link>
                
                <Link
                href="/agregar"
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
