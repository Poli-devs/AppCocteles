// API de Cócteles - Centraliza todas las peticiones HTTP al backend
import { API_URL } from "./index";

// Obtiene la lista de todos los cócteles con búsqueda opcional
export async function fetchCocktails(search = "") {
    const res = await fetch(`${API_URL}/cocktails?search=${search}`, {
        cache: "no-store",
    });
    return res.json();
}

// Obtiene los detalles de un cóctel específico por su ID
export async function fetchCocktailById(id) {
    const res = await fetch(`${API_URL}/cocktails/${id}`, { cache: "no-store" });
    return res.json();
}

// Crea un nuevo cóctel con imagen
export async function createCocktail(formData) {
    const res = await fetch(`${API_URL}/cocktails`, {
        method: "POST",
        body: formData,
    });
    return res.json();
}

// Actualiza un cóctel existente
export async function updateCocktail(id, formData) {
    const res = await fetch(`${API_URL}/cocktails/${id}`, {
        method: "PUT",
        body: formData,
    });
    return res.json();
}

// Elimina un cóctel (soft delete - cambia estado a inactivo)
export async function deleteCocktail(id) {
    const res = await fetch(`${API_URL}/cocktails/${id}`, {
        method: "DELETE",
    });
    return res.json();
}
