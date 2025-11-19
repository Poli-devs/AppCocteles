// src/index.js
import 'dotenv/config';
import app from './app.js';
import { sequelize } from './database/conexion.js';

// Importar modelos
import './models/Cocktail.js';

async function main() {
    try {
        // CAMBIAR A true PARA RESTABLECER LA BASE DE DATOS (ELIMINA TODOS LOS DATOS)
        // Después de restablecer, volver a cambiar a false
        await sequelize.sync({ force: true });

        const port = process.env.PORT || 4000;
        app.listen(port, () => {
        console.log(`🚀 Servidor escuchando en el puerto ${port}`);
        });
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
    }
}

main();
