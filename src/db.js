'use strict';

const Sequelize = require('sequelize');
const debug = require('debug')('videoly:db');

module.exports = async function dbInit({dbName, user = 'postgres', host = 'localhost'}) {
    debug(`initialize database: ${dbName} user: ${user} host: ${host}`);

    const db = new Sequelize(dbName, user, null, {
        host,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

    debug('test database connection');

    try {
        await db.authenticate();
        debug('Connection has been established successfully');
    } catch(err) {
        console.error('Unable to connect to the database:', err);
    }

    return db;
}