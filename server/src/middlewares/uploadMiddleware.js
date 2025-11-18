// src/middlewares/uploadMiddleware.js
import multer from "multer";
import path from "path";
import fs from "fs";

const baseDir = path.join(process.cwd(), "uploads/cocktails");

// Crear carpeta base si no existe
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, baseDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Solo se permiten imágenes"));
};

// Límite opcional: 5MB
const limits = { fileSize: 5 * 1024 * 1024 };
const upload = multer({ storage, fileFilter, limits });

export default upload;
