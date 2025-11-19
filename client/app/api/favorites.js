const FAVORITES_KEY = "favorites_cocktails";

export function getFavorites() {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
}

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
