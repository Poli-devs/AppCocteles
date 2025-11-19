import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DIALECT = process.env.DB_DIALECT || "postgres";
export const sequelize = new Sequelize(
    process.env.DB_NAME || "AppCocktail",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "123456",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: DIALECT,
        timezone: process.env.DB_TIMEZONE || "+00:00",
        logging: process.env.DB_LOGGING === "true" ? console.log : false,
    }
);

export const regenerarBD = false;
