'use strict';

const Sequelize = require('sequelize');

module.exports = (db) => {
    return db.define('PageViews', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        time: {
            type: Sequelize.DATE,
            allowNull: false
        },
        productId: {
            type: Sequelize.STRING,
            field: 'product_id'
        },
        visitorId: {
            type: Sequelize.STRING,
            field: 'visitor_id'
        },
        browser: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'browser_name'
        },
        url: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'pageviews'
    });
};
