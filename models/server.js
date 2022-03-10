const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config')
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        //conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Servidor corriendo en puerto: ${this.port}| http://localhost:${this.port}/`);
        });
    }

}

module.exports = Server;
