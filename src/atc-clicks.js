'use strict';

const Sequelize = require('sequelize');

module.exports = (db, options = {}) => {
    return db.define('AtcClicks', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        impressionId: {
            type: Sequelize.INTEGER,
            field: 'impression_id',
            references: {
                model: options.ref,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        clickId: {
            type: Sequelize.INTEGER,
            field: 'click_id'
        },
        localtime: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'atc_clicks'
    });
};

