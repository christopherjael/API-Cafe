const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.paths = {
      users: '/api/users',
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads',
    };

    // Connect to database
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    this.app.use(express.json());

    // public content
    this.app.use(express.static('public'));

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.users, require('../routes/users'));
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.search, require('../routes/search'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `🚀 Server run on port: ${this.port}| http://localhost:${this.port}/`
      );
    });
  }
}

module.exports = Server;
