'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3005,
    routes: { cors: true }
});

server.app.db = mongojs('localhost:27017/pets', ['books', 'posts', 'likes']);

server.register([require('./routes/books')], err => {
    if (err) {
        throw err;
    }

    // Start the server
    server.start(err => {
        console.log('Server running at:', server.info.uri);
    });
});
