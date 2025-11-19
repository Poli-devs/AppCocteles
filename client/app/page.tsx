"use client";
import { useEffect, useState } from "react";
import { fetchCocktails } from "./api/cocktails";
import CocktailCard from "@/components/CocktailCard";
interface Cocktail { id_cocktail: number; nombre: string; descripcion?: string; precio: number; imagen_url?: string; disponible: boolean; }

// Página principal - Catálogo de cócteles con búsqueda y filtros
export default function HomePage() {
  const [search, setSearch] = useState("");
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'available' | 'unavailable' | 'all'>('available');

  // Carga los cócteles desde el backend con búsqueda opcional
  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchCocktails(search);
      
      if (!res.ok) {
        throw new Error(res.message || "Error al cargar los cócteles");
      }
      
      setCocktails(res.data || []);
    } catch (err) {
      console.error("Error cargando cócteles:", err);
      const errorMessage = err instanceof Error ? err.message : "Error de conexión con el servidor";
      setError(errorMessage);
      setCocktails([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [search]);

  // Renderiza el catálogo con búsqueda, filtros y grid de tarjetas
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Catálogo de Cócteles</h1>
        <p className="text-gray-600">Explora nuestra colección de deliciosos cócteles</p>
      </div>

      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Buscar cócteles por nombre..."
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        {/* Filtro de disponibilidad */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Filtrar por:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('available')}
              className={`px-3 py-1.5 rounded-md text-sm transition ${
                filterStatus === 'available'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Disponibles
            </button>
            <button
              onClick={() => setFilterStatus('unavailable')}
              className={`px-3 py-1.5 rounded-md text-sm transition ${
                filterStatus === 'unavailable'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              No disponibles
            </button>
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-md text-sm transition ${
                filterStatus === 'all'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Todos
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button 
            onClick={load}
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
            <p className="text-gray-600">Cargando cócteles...</p>
          </div>
        </div>
      ) : cocktails.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-2">
            {search ? "No se encontraron cócteles" : "No hay cócteles registrados"}
          </p>
          <p className="text-gray-500">
            {search ? "Intenta con otro término de búsqueda" : "Agrega tu primer cóctel"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cocktails
            .filter(c => {
              if (filterStatus === 'available') return c.disponible;
              if (filterStatus === 'unavailable') return !c.disponible;
              return true; // 'all'
            })
            .map((c) => (
              <CocktailCard key={c.id_cocktail} cocktail={c} showAvailability={true} />
            ))}
        </div>
      )}
    </div>
  );
}
