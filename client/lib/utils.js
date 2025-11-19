/**
 * Construye la URL completa de una imagen desde el backend
 * @param {string} imagenUrl - URL relativa o completa de la imagen
 * @returns {string} URL completa de la imagen o placeholder
 */
export function getImageUrl(imagenUrl) {
  if (!imagenUrl) return '/placeholder.jpg';
  if (imagenUrl.startsWith('http')) return imagenUrl;
  return `http://localhost:4000${imagenUrl}`;
}

/**
 * Valida si un archivo es una imagen válida
 * @param {File} file - Archivo a validar
 * @returns {boolean} true si es una imagen válida
 */
export function isValidImageFile(file) {
  if (!file) return false;
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
}

/**
 * Formatea el precio para mostrar
 * @param {number} precio - Precio a formatear
 * @returns {string} Precio formateado
 */
export function formatPrice(precio) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD'
  }).format(precio);
}
