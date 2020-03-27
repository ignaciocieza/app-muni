const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const compression = require('compression');
const port = process.env.PORT || 3001;


server.use(middlewares);
server.use(router);
server.use(compression);

server.listen(port);