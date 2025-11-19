-- Script para restablecer la base de datos

-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS "AppCocktail";

-- Crear la base de datos
CREATE DATABASE "AppCocktail";

-- Conectar a la base de datos
\c AppCocktail

-- Crear la tabla cocktails
CREATE TABLE cocktails (
    id_cocktail SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    imagen_url VARCHAR(255),
    disponible BOOLEAN NOT NULL DEFAULT TRUE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Insertar datos de prueba (opcional)
INSERT INTO cocktails (nombre, descripcion, precio, disponible) VALUES
('Mojito', 'Refrescante cóctel cubano con menta y ron', 8.50, true),
('Margarita', 'Clásico cóctel mexicano con tequila y limón', 9.00, true),
('Piña Colada', 'Tropical cóctel con ron, piña y coco', 10.00, true),
('Daiquiri', 'Cóctel cubano con ron, limón y azúcar', 7.50, true),
('Cosmopolitan', 'Elegante cóctel con vodka y arándano', 11.00, false);

-- Verificar los datos
SELECT * FROM cocktails;
