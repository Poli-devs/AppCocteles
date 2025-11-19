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
    disponible?: boolean;
}

interface CocktailCardProps {
    cocktail: Cocktail;
    hideDetailLink?: boolean;
    showAvailability?: boolean;
}

// Componente de tarjeta para mostrar información de un cóctel
export default function CocktailCard({ cocktail, hideDetailLink = false, showAvailability = false }: CocktailCardProps) {
    const [isFav, setIsFav] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Verifica si el cóctel está en favoritos al cargar
    useEffect(() => {
        const favs = getFavorites();
        setIsFav(favs.includes(cocktail.id_cocktail));
    }, [cocktail.id_cocktail]);

    // Alterna el estado de favorito del cóctel
    const handleFavorite = () => {
        const favs = toggleFavorite(cocktail.id_cocktail);
        setIsFav(favs.includes(cocktail.id_cocktail));
    };

    const imageUrl = imageError ? '/placeholder.jpg' : getImageUrl(cocktail.imagen_url || '');

    const isUnavailable = showAvailability && cocktail.disponible === false;

    // Renderiza la tarjeta con imagen, precio y botón de favoritos
    return (
        <div className={`bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow ${isUnavailable ? 'opacity-75' : ''}`}>
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={cocktail.nombre}
                    className="w-full h-48 object-cover"
                    onError={() => setImageError(true)}
                />
                {isUnavailable && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                            No Disponible
                        </span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{cocktail.nombre}</h3>
                <p className="text-lg font-semibold text-green-600 mb-3">
                    {formatPrice(cocktail.precio)}
                </p>

                <div className="flex justify-between items-center">
                    {!hideDetailLink && (
                        <Link
                            href={`/cocktails/${cocktail.id_cocktail}`}
                            prefetch={true}
                            className="text-blue-600 hover:text-blue-800 underline font-medium"
                        >
                            Ver detalle
                        </Link>
                    )}

                    <button 
                        onClick={handleFavorite}
                        className={`text-2xl hover:scale-110 transition-transform ${hideDetailLink ? 'ml-auto' : ''}`}
                        aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                    >
                        {isFav ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
        </div>
    );
}
