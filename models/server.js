const express = require('express')
const cors = require('cors')


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de apps
        this.routes();
    }
    middlewares() {
        //cors
        this.app.use(cors());
        //lectura y parseo
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }
    routes() {

        this.app.use('/api/usuarios', require('../routes/user'));


    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;