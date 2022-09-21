const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();

    this.pathUser = "/api/user";

    this.middlewares();
    
    this.routes();

    this.port = process.env.PORT;
  }

  routes() {
    this.app.use(this.pathUser, require("../routes/user"));
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
