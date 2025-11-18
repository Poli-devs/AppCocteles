// src/models/Cocktail.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";

export const Cocktail = sequelize.define("Cocktail",
    {
        id_cocktail: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
        nombre: { type: DataTypes.STRING(100), allowNull: false, },
        descripcion: { type: DataTypes.TEXT, allowNull: true, },
        precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false, },
        imagen_url: { type: DataTypes.STRING, allowNull: true, comment: "Ruta de la imagen almacenada en /uploads", },
        disponible: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, },
    },
    {
        tableName: "cocktails",
        timestamps: true,
    }
);

export default Cocktail;
