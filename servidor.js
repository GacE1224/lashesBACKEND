require('dotenv').config({ path: './admin.env' });
// 1. Importa la aplicación Express configurada desde app.js
const app = require('./app'); 
const conectarBD = require('./conexion/db');



const PUERTO = process.env.PUERTO || 3000;

const startServer = async () => {
    try {
        // 2. Conexión a la base de datos (se usa 'await' para asegurar la conexión antes de arrancar)
        await conectarBD(); 
        
        // 3. Inicia el servidor
        app.listen(PUERTO, () => {
            console.log(`🚀 Servidor ejecutándose en el puerto ${PUERTO}`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();