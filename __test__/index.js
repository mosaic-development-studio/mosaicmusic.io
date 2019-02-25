const { Server } = require(__dirname + '/../lib/server');
const PORT = process.env.TEST_SERVER_PORT || 3001;
const devServer = new Server('/../dist', PORT);

devServer.start();

module.exports = {
    TEST_SERVER_PORT: PORT
};