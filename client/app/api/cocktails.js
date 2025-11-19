import { API_URL } from "./index";

export async function fetchCocktails(search = "") {
    const res = await fetch(`${API_URL}/cocktails?search=${search}`, {
        cache: "no-store",
    });
    return res.json();
}

export async function fetchCocktailById(id) {
    const res = await fetch(`${API_URL}/cocktails/${id}`, { cache: "no-store" });
    return res.json();
}

export async function createCocktail(formData) {
    const res = await fetch(`${API_URL}/cocktails`, {
        method: "POST",
        body: formData,
    });
    return res.json();
}

export async function updateCocktail(id, formData) {
    const res = await fetch(`${API_URL}/cocktails/${id}`, {
        method: "PUT",
        body: formData,
    });
    return res.json();
}
