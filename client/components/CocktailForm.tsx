"use client";
import { useState, useEffect } from "react";
import { isValidImageFile, getImageUrl } from "@/lib/utils";

interface CocktailFormProps {
    initialData?: {
        nombre?: string;
        descripcion?: string;
        precio?: number | string;
        imagen_url?: string;
        disponible?: boolean;
    };
    onSubmit: (formData: FormData) => Promise<void>;
    submitLabel?: string;
    showAvailabilityField?: boolean;
}

// Componente de formulario reutilizable para crear y editar cócteles
export default function CocktailForm({ initialData = {}, onSubmit, submitLabel = "Guardar", showAvailabilityField = false }: CocktailFormProps) {
    const [form, setForm] = useState({
        nombre: initialData.nombre || "",
        descripcion: initialData.descripcion || "",
        precio: initialData.precio || "",
        disponible: initialData.disponible !== undefined ? initialData.disponible : true,
        imagen: null as File | null,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Carga la imagen existente cuando hay datos iniciales
    useEffect(() => {
        if (initialData?.imagen_url) {
            setImagePreview(getImageUrl(initialData.imagen_url));
        }
    }, [initialData?.imagen_url]);

    // Maneja los cambios en los campos del formulario y valida imágenes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target instanceof HTMLInputElement && e.target.name === "imagen") {
            const file = e.target.files?.[0];
            
            if (file) {
                if (!isValidImageFile(file)) {
                    setError("Por favor selecciona un archivo de imagen válido (JPG, PNG, GIF, WEBP)");
                    e.target.value = "";
                    return;
                }
                
                if (file.size > 5 * 1024 * 1024) { // 5MB
                    setError("La imagen no debe superar los 5MB");
                    e.target.value = "";
                    return;
                }
                
                setForm({ ...form, imagen: file });
                
                // Crear preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
        setError(null);
    };

    // Valida y envía el formulario al backend
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!form.nombre.trim()) {
            setError("El nombre es obligatorio");
            return;
        }
        if (!form.descripcion.trim()) {
            setError("La descripción es obligatoria");
            return;
        }
        if (!form.precio || parseFloat(form.precio.toString()) <= 0) {
            setError("El precio debe ser mayor a 0");
            return;
        }

        const data = new FormData();
        data.append("nombre", form.nombre.trim());
        data.append("descripcion", form.descripcion.trim());
        data.append("precio", form.precio.toString());
        
        if (showAvailabilityField) {
            data.append("disponible", form.disponible.toString());
        }
        if (form.imagen) {
            data.append("imagen", form.imagen);
        }
        try {
            setLoading(true);
            await onSubmit(data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Error al guardar el cóctel";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Renderiza el formulario con validación y preview de imagen
    return (
        <form className="space-y-4 bg-white p-6 rounded-lg shadow" onSubmit={handleSubmit}>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del cóctel *
                </label>
                <input
                    name="nombre"
                    placeholder="Ej: Mojito"
                    value={form.nombre}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={loading}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                </label>
                <textarea
                    name="descripcion"
                    placeholder="Describe el cóctel..."
                    value={form.descripcion}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    required
                    disabled={loading}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio *
                </label>
                <input
                    name="precio"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={form.precio}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={loading}
                />
            </div>

            {showAvailabilityField && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado
                    </label>
                    <select
                        name="disponible"
                        value={form.disponible ? 'true' : 'false'}
                        onChange={(e) => setForm({ ...form, disponible: e.target.value === 'true' })}
                        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    >
                        <option value="true">Disponible</option>
                        <option value="false">No disponible</option>
                    </select>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen {initialData?.imagen_url && "(Opcional - dejar vacío para mantener la actual)"}
                </label>
                {imagePreview && (
                    <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-2">
                            {initialData?.imagen_url ? "Imagen actual:" : "Vista previa:"}
                        </p>
                        <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full max-w-xs h-48 object-cover rounded-lg border-2 border-gray-200"
                        />
                    </div>
                )}
                <input
                    name="imagen"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                    Formatos: JPG, PNG, GIF, WEBP (máx. 5MB)
                </p>
            </div>

            <button 
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-lg w-full hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition"
                disabled={loading}
            >
                {loading ? "Guardando..." : submitLabel}
            </button>
        </form>
    );
}
