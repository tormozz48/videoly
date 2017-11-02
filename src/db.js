'use strict';

const Sequelize = require('sequelize');
const debug = require('debug')('videoly:db');

module.exports = async function dbInit({dbName, user, password, host}) {
    const db = new Sequelize(dbName, user, password, {
        host,
        dialect: 'postgres',
        logging: () => {},
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });

    try {
        await db.authenticate();
    } catch(err) {
        console.error('Unable to connect to the database:', err);
    }

    return db;
}