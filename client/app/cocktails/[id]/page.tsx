"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCocktailById, updateCocktail, deleteCocktail } from "@/app/api/cocktails";
import CocktailForm from "@/components/CocktailForm";
import { getImageUrl, formatPrice } from "@/lib/utils";
import Link from "next/link";
interface Cocktail { id_cocktail: number; nombre: string; descripcion?: string; precio: number; imagen_url?: string; disponible: boolean; createdAt: string; updatedAt: string; }

export default function CocktailDetail({ params }: { params: Promise<{ id: string }> | { id: string } }) {
    // Manejar params como Promise o como objeto directo
    const [id, setId] = useState<string>("");
    
    useEffect(() => {
        const resolveParams = async () => {
            const resolvedParams = await Promise.resolve(params);
            setId(resolvedParams.id);
        };
        resolveParams();
    }, [params]);
    const router = useRouter();
    const [cocktail, setCocktail] = useState<Cocktail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    // Estados para modales
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Carga los datos del cóctel desde el backend
    const loadCocktail = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetchCocktailById(id);
            
            if (!res.ok) {
                throw new Error(res.message || "Cóctel no encontrado");
            }
            
            setCocktail(res.data);
        } catch (err) {
            console.error("Error cargando cóctel:", err);
            const errorMessage = err instanceof Error ? err.message : "Error al cargar el cóctel";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            loadCocktail();
        }
    }, [id]);

    // Maneja la actualización del cóctel
    const handleUpdate = async (formData: FormData) => {
        try {
            const res = await updateCocktail(id, formData);
            
            if (!res.ok) {
                throw new Error(res.message || "Error al actualizar el cóctel");
            }
            
            setCocktail(res.data);
            setSuccess(true);
            setShowEditModal(false);
            
            // Ocultar mensaje de éxito después de 3 segundos
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
            
            // Scroll al inicio para ver el mensaje
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error("Error actualizando cóctel:", error);
            throw error;
        }
    };

    // Maneja la eliminación del cóctel (soft delete)
    const handleDelete = async () => {
        try {
            const res = await deleteCocktail(id);
            
            if (!res.ok) {
                throw new Error(res.message || "Error al eliminar el cóctel");
            }
            
            // Redirigir a la página principal
            router.push("/");
        } catch (error) {
            console.error("Error eliminando cóctel:", error);
            const errorMessage = error instanceof Error ? error.message : "Error al eliminar el cóctel";
            setError(errorMessage);
            setShowDeleteModal(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando cóctel...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-2xl mx-auto">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
                <Link 
                    href="/"
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    ← Volver al inicio
                </Link>
            </div>
        );
    }

    if (!cocktail) {
        return (
            <div className="p-6 max-w-2xl mx-auto">
                <p className="text-gray-600">Cóctel no encontrado</p>
                <Link 
                    href="/"
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    ← Volver al inicio
                </Link>
            </div>
        );
    }

    const imageUrl = imageError ? '/placeholder.jpg' : getImageUrl(cocktail.imagen_url || '');

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <p className="font-bold">¡Éxito!</p>
                    <p>El cóctel ha sido actualizado correctamente.</p>
                </div>
            )}

            {/* Información del cóctel */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img
                            src={imageUrl}
                            alt={cocktail.nombre}
                            className="w-full h-96 object-cover"
                            onError={() => setImageError(true)}
                        />
                    </div>
                    <div className="md:w-1/2 p-6">
                        <h1 className="text-3xl font-bold mb-3 text-gray-800">{cocktail.nombre}</h1>
                        
                        <div className="mb-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                                cocktail.disponible 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {cocktail.disponible ? 'Disponible' : 'No disponible'}
                            </span>
                        </div>

                        <p className="text-gray-700 mb-4 text-lg">
                            {cocktail.descripcion || "Sin descripción"}
                        </p>

                        <div className="border-t pt-4 mb-4">
                            <p className="text-3xl font-bold text-green-600">
                                {formatPrice(cocktail.precio)}
                            </p>
                        </div>

                        <div className="mb-6 text-sm text-gray-500">
                            <p>Creado: {new Date(cocktail.createdAt).toLocaleDateString('es-ES')}</p>
                            <p>Actualizado: {new Date(cocktail.updatedAt).toLocaleDateString('es-ES')}</p>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowEditModal(true)}
                                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                Editar
                            </button>
                            {cocktail.disponible && (
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                                >
                                    Eliminar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Edición */}
            {showEditModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">Editar Cóctel</h2>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            <CocktailForm
                                initialData={cocktail}
                                onSubmit={handleUpdate}
                                submitLabel="Actualizar Cóctel"
                                showAvailabilityField={true}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación de Eliminación */}
            {showDeleteModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">¿Eliminar cóctel?</h2>
                        <p className="text-gray-600 mb-6">
                            ¿Estás seguro de que deseas eliminar <strong>{cocktail.nombre}</strong>? 
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-medium"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-medium"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
