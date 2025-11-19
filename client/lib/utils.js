// Construye la URL completa de una imagen desde el backend
export function getImageUrl(imagenUrl) {
  if (!imagenUrl || imagenUrl === 'null' || imagenUrl === 'undefined') {
    return '/placeholder.jpg';
  }
  if (imagenUrl.startsWith('http')) return imagenUrl;
  return `http://localhost:4000${imagenUrl}`;
}

// Valida si un archivo es una imagen válida (jpeg, jpg, png, gif, webp)
export function isValidImageFile(file) {
  if (!file) return false;
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
}

// Formatea un número como precio en formato de moneda USD
export function formatPrice(precio) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD'
  }).format(precio);
}
