const express = require('express');

class Server {
    constructor(dir, port) {
        this.app = express();
        this.dir = dir;
        this.port = port;
    }

    start() {
        this.serve();
        this.app.listen(this.port, console.log('Listening at ' + this.port)); // eslint-disable-line no-console
    }

    serve() {
        this.app.use(express.static(__dirname + this.dir));
    }
}

module.exports = { Server };