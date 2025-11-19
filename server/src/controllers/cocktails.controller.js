// src/controllers/cocktails.controller.js
import cocktailService from "../services/cocktails.service.js";
import path from "path";
import fs from "fs";

/**
 * Obtener todos los cócteles
 * - Permite búsqueda opcional por nombre con query `?search=`
 * - Retorna mensaje si no hay registros
 */
export const getAllCocktails = async (req, res) => {
    try {
        const { search } = req.query;
        const cocktails = await cocktailService.getAll(search);

        if (!cocktails || cocktails.length === 0) {
            return res.json({ ok: true, message: "No hay cócteles registrados", data: [] });
        }

        return res.json({ ok: true, data: cocktails });
    } catch (error) {
        console.error("Error getAllCocktails:", error);
        return res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
};

/**
 * Obtener un cóctel por su ID
 * - Retorna 404 si no se encuentra
 */
export const getCocktailById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ ok: false, message: "ID del cóctel requerido" });

        const cocktail = await cocktailService.getById(id);
        return res.json({ ok: true, data: cocktail });
    } catch (error) {
        console.error("Error getCocktailById:", error);
        return res.status(404).json({ ok: false, message: error.message });
    }
};

/**
 * Crear un nuevo cóctel
 * - Permite subir imagen (archivo)
 * - Elimina archivo en caso de error para evitar basura
 */
export const createCocktail = async (req, res) => {
    let filePath;
    try {
        const data = req.body;

        if (req.file) {
            data.imagen = `/uploads/cocktails/${req.file.filename}`;
            filePath = path.join(process.cwd(), "uploads", "cocktails", req.file.filename);
        }

        const cocktail = await cocktailService.create(data);
        return res.status(201).json({ ok: true, message: "Cóctel creado exitosamente", data: cocktail });
    } catch (error) {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
        console.error("Error createCocktail:", error);
        return res.status(400).json({ ok: false, message: error.message || "Error creando cóctel" });
    }
};

/**
 * Actualizar un cóctel existente
 * - Permite cambiar imagen y demás campos
 * - Maneja limpieza de archivo anterior si se reemplaza la imagen
 */
export const updateCocktail = async (req, res) => {
    let filePath;
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ ok: false, message: "ID del cóctel requerido" });

        const data = req.body;

        if (req.file) {
            data.imagen = `/uploads/cocktails/${req.file.filename}`;
            filePath = path.join(process.cwd(), "uploads", "cocktails", req.file.filename);
        }

        const updated = await cocktailService.update(id, data);
        return res.json({ ok: true, message: "Cóctel actualizado exitosamente", data: updated });
    } catch (error) {
        if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
        console.error("Error updateCocktail:", error);
        return res.status(400).json({ ok: false, message: error.message || "Error actualizando cóctel" });
    }
};

/**
 * Desactivar un cóctel (soft delete)
 * - Cambia el campo 'disponible' a false
 */
export const deleteCocktail = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ ok: false, message: "ID del cóctel requerido" });

        const cocktail = await cocktailService.softDelete(id);
        return res.json({ ok: true, message: "Cóctel desactivado exitosamente", data: cocktail });
    } catch (error) {
        // Si es un error esperado (validación o negocio), no imprimir stack
        const expectedErrors = [
            "ID del cóctel es obligatorio",
            "Cóctel no encontrado",
            "Cóctel ya está inactivo"
        ];

        if (expectedErrors.includes(error.message)) {
            // Solo mostrar mensaje limpio
            return res.status(400).json({ ok: false, message: error.message });
        }

        // Para errores inesperados, sí imprimir stack
        console.error("Error deleteCocktail inesperado:", error);
        return res.status(500).json({ ok: false, message: "Error interno del servidor" });
    }
};
