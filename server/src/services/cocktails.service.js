// src/services/cocktails.service.js
import Cocktail from "../models/Cocktail.js";
import { Op } from "sequelize";
import fs from "fs";
import path from "path";

class CocktailService {
    // Obtener todos los cócteles (búsqueda opcional por nombre)
    async getAll(search = "") {
        const where = search ? { nombre: { [Op.iLike]: `%${search}%` } } : {};
        return await Cocktail.findAll({ where, order: [["createdAt", "DESC"]] });
    }

    // Obtener cóctel por ID
    async getById(id) {
        if (!id) throw new Error("ID del cóctel es obligatorio");
        const cocktail = await Cocktail.findByPk(id);
        if (!cocktail) throw new Error("Cóctel no encontrado");
        return cocktail;
    }

    // Crear un nuevo cóctel
    async create(data) {
        if (!data.nombre) throw new Error("El campo 'nombre' es obligatorio");
        if (!data.precio) throw new Error("El campo 'precio' es obligatorio");

        const payload = {
            nombre: data.nombre,
            descripcion: data.descripcion || null,
            precio: data.precio,
            imagen_url: data.imagen || data.imagen_url || null,
            disponible: data.disponible !== undefined
                ? !!(data.disponible === "true" || data.disponible === true)
                : true,
        };

        return await Cocktail.create(payload);
    }

    // Actualizar un cóctel existente
    async update(id, data) {
        if (!id) throw new Error("ID del cóctel es obligatorio");
        const cocktail = await Cocktail.findByPk(id);
        if (!cocktail) throw new Error("Cóctel no encontrado");

        // Reemplazar imagen y borrar anterior si existe
        if (data.imagen || data.imagen_url) {
            const newImg = data.imagen || data.imagen_url;
            if (cocktail.imagen_url && cocktail.imagen_url !== newImg) {
                const oldPath = path.join(process.cwd(), cocktail.imagen_url.replace(/^\//, ""));
                if (fs.existsSync(oldPath)) {
                    try { fs.unlinkSync(oldPath); } 
                    catch (e) { console.warn("No se pudo borrar imagen antigua:", e); }
                }
            }
            data.imagen_url = newImg;
        }

        const updatePayload = {
            nombre: data.nombre ?? cocktail.nombre,
            descripcion: data.descripcion ?? cocktail.descripcion,
            precio: data.precio ?? cocktail.precio,
            disponible: data.disponible !== undefined
                ? !!(data.disponible === "true" || data.disponible === true)
                : cocktail.disponible,
        };

        if (data.imagen_url) updatePayload.imagen_url = data.imagen_url;

        await cocktail.update(updatePayload);
        return cocktail;
    }

    // Desactivar un cóctel (soft delete)
    async softDelete(id) {
        if (!id) throw new Error("ID del cóctel es obligatorio");

        const cocktail = await Cocktail.findByPk(id);
        if (!cocktail) throw new Error("Cóctel no encontrado");
        if (!cocktail.disponible) throw new Error("Cóctel ya está inactivo");

        await cocktail.update({ disponible: false });
        return cocktail;
    }
}

export default new CocktailService();
