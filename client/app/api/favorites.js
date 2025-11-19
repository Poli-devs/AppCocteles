// API de Favoritos - Maneja el almacenamiento local de cócteles favoritos
const FAVORITES_KEY = "favorites_cocktails";

// Obtiene la lista de IDs de cócteles favoritos desde localStorage
export function getFavorites() {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

// Agrega o quita un cóctel de favoritos
export function toggleFavorite(id) {
    let favs = getFavorites();
    if (favs.includes(id)) {
        favs = favs.filter(f => f !== id);
    } else {
        favs.push(id);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    return favs;
}
