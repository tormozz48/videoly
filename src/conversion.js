'use strict';

const _ = require('lodash');
const Sequelize = require('sequelize');
const dbInit = require('./db');
const definePageViews = require('./models/pageviews');
const Op = Sequelize.Op;

module.exports = async function(options = {}) {
    options = _.defaults(options, {
        dbName: 'postgres',
        user: 'postgres',
        password: null,
        host: 'localhost'
    });

    console.info('start to calculate conversion');
    console.info(`database name: "${options.dbName}"`);
    console.info(`database user: "${options.user}"`);
    console.info(`database password: "${options.password}"`);
    console.info(`database host: "${options.host}"`);

    const db = await dbInit(options);

    const PageViews = definePageViews(db);

    let pageViews = await PageViews.findAll({
        where: {
            time: {[Op.between]: [new Date(2017, 6, 1), new Date(2017, 7, 1)]},
            url: {[Op.like]: '%shop1.com%'}
        }
    });

    console.info(`Records found: ${pageViews.length}' for July and "shop1.com" url pattern`);

    const conversions = _(pageViews)
        .map('dataValues')
        .map(convertItemDate)
        .groupBy('time')
        .map((value) => _.uniqBy(value, 'productId'))
        .map((value) => value.length)
        .sum();

    console.info(`Calculated conversions amount: ${conversions}`);

    await db.close();
};

function convertItemDate(item) {
    const date = new Date(item.time);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    item.time = `${year}-${month}-${day}`;
    return item;
}
