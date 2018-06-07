'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    port: 3005,
    routes: { cors: true }
});

const db_host = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
const db_port = process.env.DB_PORT ? process.env.DB_PORT : '27017';

server.app.db = mongojs(`${db_host}:${db_port}/pets`, ['posts', 'likes']);

server.register([require('./routes/books')], err => {
    if (err) {
        throw err;
    }

    server.start(err => {
        console.log('API Server running at:', server.info.uri);
    });
});
