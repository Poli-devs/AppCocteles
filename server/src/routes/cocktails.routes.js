// src/routes/cocktails.routes.js
import { Router } from "express";
import { getAllCocktails, getCocktailById, createCocktail, updateCocktail, deleteCocktail } from "../controllers/cocktails.controller.js";
import upload from "../middlewares/uploadMiddleware.js";
const router = Router();

// Listar todos (con buscador opcional)
router.get("/", getAllCocktails);

// Traer detalle por ID
router.get("/:id", getCocktailById);

// Crear nuevo cóctel con imagen
router.post("/", upload.single("imagen"), createCocktail);

// Editar cóctel (opcionalmente subir nueva imagen)
router.put("/:id", upload.single("imagen"), updateCocktail);

//Eliminar coctel (cambio de estado de activo a inactivo    )
router.delete("/:id", deleteCocktail);

export default router;
