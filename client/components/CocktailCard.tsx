"use client";

import Link from "next/link";
import { toggleFavorite, getFavorites } from "@/app/api/favorites";
import { useEffect, useState } from "react";
import { getImageUrl, formatPrice } from "@/lib/utils";

interface Cocktail {
    id_cocktail: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    imagen_url?: string;
}

export default function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
    const [isFav, setIsFav] = useState(false);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const favs = getFavorites();
        setIsFav(favs.includes(cocktail.id_cocktail));
    }, [cocktail.id_cocktail]);

    const handleFavorite = () => {
        const favs = toggleFavorite(cocktail.id_cocktail);
        setIsFav(favs.includes(cocktail.id_cocktail));
    };

    const imageUrl = imageError ? '/placeholder.jpg' : getImageUrl(cocktail.imagen_url || '');

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
                src={imageUrl}
                alt={cocktail.nombre}
                className="w-full h-48 object-cover"
                onError={() => setImageError(true)}
            />
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{cocktail.nombre}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {cocktail.descripcion || "Sin descripción"}
                </p>
                <p className="text-lg font-semibold text-green-600 mb-3">
                    {formatPrice(cocktail.precio)}
                </p>

                <div className="flex justify-between items-center">
                    <Link
                        href={`/cocktails/${cocktail.id_cocktail}`}
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                    >
                        Ver detalle
                    </Link>

                    <button 
                        onClick={handleFavorite}
                        className="text-2xl hover:scale-110 transition-transform"
                        aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                        {isFav ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
        </div>
    );
}
