// conexion.js
import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        timezone: process.env.DB_TIMEZONE,
        logging: process.env.DB_LOGGING === "true" ? console.log : false,
    }
);

export const regenerarBD = false;
export { sequelize };