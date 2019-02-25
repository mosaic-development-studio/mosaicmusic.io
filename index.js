const { Server } = require(__dirname + '/lib/server');
const PORT = process.env.PORT || 3000;
const devServer = new Server('/../dist', PORT);

devServer.start();