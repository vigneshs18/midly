const winston = require('winston');
const app = require('./app');

const port = process.env.port || 3000;
const server = app.listen(port, () => winston.info(`Listening on post : ${port} ...`));