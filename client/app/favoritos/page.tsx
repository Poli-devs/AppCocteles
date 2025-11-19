"use client";
import { useEffect, useState } from "react";
import { getFavorites } from "@/app/api/favorites";
import { fetchCocktailById } from "@/app/api/cocktails";
import CocktailCard from "@/components/CocktailCard";
import Link from "next/link";

interface Cocktail {
  id_cocktail: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen_url?: string;
  disponible?: boolean;
}

// Página que muestra los cócteles marcados como favoritos
export default function FavoritosPage() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  // Carga los detalles de todos los cócteles favoritos desde localStorage
  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const favoriteIds = getFavorites();
      
      if (favoriteIds.length === 0) {
        setCocktails([]);
        setLoading(false);
        return;
      }

      // Obtener detalles de cada cóctel favorito
      const promises = favoriteIds.map((id: number) => fetchCocktailById(id));
      const results = await Promise.all(promises);
      
      const validCocktails = results
        .filter(res => res.ok && res.data)
        .map(res => res.data);
      
      setCocktails(validCocktails);
    } catch (err) {
      console.error("Error cargando favoritos:", err);
      const errorMessage = err instanceof Error ? err.message : "Error al cargar favoritos";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Renderiza la lista de favoritos con estados de carga, error y vacío
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Mis Favoritos</h1>
        <p className="text-gray-600">Tus cócteles favoritos guardados</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button 
            onClick={loadFavorites}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando favoritos...</p>
          </div>
        </div>
      ) : cocktails.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🤍</p>
          <p className="text-xl text-gray-600 mb-2">No tienes favoritos aún</p>
          <p className="text-gray-500 mb-4">
            Explora el catálogo y marca tus cócteles favoritos
          </p>
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Ver Catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cocktails.map((c) => (
            <CocktailCard key={c.id_cocktail} cocktail={c} hideDetailLink={true} showAvailability={true} />
          ))}
        </div>
      )}
    </div>
  );
}
