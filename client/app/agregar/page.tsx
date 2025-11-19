"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CocktailForm from "@/components/CocktailForm";
import { createCocktail } from "@/app/api/cocktails";

export default function AddCocktailPage() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        try {
            const res = await createCocktail(formData);
            
            if (!res.ok) {
                throw new Error(res.message || "Error al crear el cóctel");
            }
            
            setSuccess(true);
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } catch (error) {
            console.error("Error creando cóctel:", error);
            throw error;
        }
    };

    return (
        <main className="p-6 max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">Agregar Nuevo Cóctel</h1>
                <p className="text-gray-600">Completa el formulario para agregar un cóctel al catálogo</p>
            </div>

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    <p className="font-bold">¡Éxito!</p>
                    <p>El cóctel ha sido creado correctamente. Redirigiendo...</p>
                </div>
            )}

            <CocktailForm 
                onSubmit={handleSubmit}
                submitLabel="Crear Cóctel"
            />
        </main>
    );
}
