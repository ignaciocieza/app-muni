const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const compression = require('compression');
const server = express();
const port = process.env.PORT || 3001;

//server.use(jsonServer.router('db.json'));
server.use(middlewares);
server.use(router);
server.use(cors()); 
server.use(compression);

if (process.env.NODE_ENV === 'production') {
    server.use(express.static(path.join(__dirname, 'client/build')));

    server.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    }) //* -> todo url que usuario "hit", golpee. se ejecuta la funcion
}

server.listen(port);