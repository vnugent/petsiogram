'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');

const imageHelper = require('../imageHelper');
const day0 = require('../../initial-data.json');

exports.register = function (server, options, next) {
    const db = server.app.db;

    server.route({
        method: 'GET',
        path: '/posts',
        handler: function (request, reply) {
            db.posts.find((err, docs) => {
                if (err) {
                    return reply(Boom.wrap(err, 'Internal MongoDB error'));
                }
                console.log('## docs', docs);

                reply(docs);
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/init',
        handler: function (request, reply) {
            db.posts.remove();
            // db.createCollection('posts');
            db.likes.remove();
            // db.createCollection('likes');

            day0.forEach(element => {
                const post = {
                    id: uuid.v1(),
                    imagePath: element.imagePath,
                    description: element.description
                };
                db.posts.save(post, (err, result) => {
                    if (err) {
                        return reply(Boom.wrap(err, 'Internal MongoDB error'));
                    }
                });
                db.likes.in
            });


            reply().code(200);
        }
    });

    server.route({
        method: 'POST',
        path: '/like',
        handler: function (request, reply) {
            const like_entry = { media_id: request.payload.media_id, user_id: uuid.v1(), timestamp: new Date() };
            db.likes.save(like_entry);
            reply(like_entry);
        }
    });

    server.route({
        method: 'GET',
        path: '/likes',
        handler: function (request, reply) {
            const query =
                { "$group": { _id: '$media_id', count: { $sum: 1 } } };
            db.likes.aggregate(query, (error, items) => {
                reply(items);
            });
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-books'
};
