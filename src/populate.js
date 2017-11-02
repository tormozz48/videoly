'use strict';

const _ = require('lodash');
const clui = require('clui');
const randomize = require('randomatic');
const Sequelize = require('sequelize');
const terminalOverwrite = require('terminal-overwrite');
const dbInit = require('./db');
const utils = require('./utils');
const definePageViews = require('./models/pageviews');
const defineAtcClicks = require('./models/atc-clicks');

const BATCH_SIZE = 5000;
const DATE_RANGE = {
    start: new Date(2017, 0, 1),
    end: new Date(2017, 7, 31)
};

module.exports = async function(options = {}) {
    options = _.defaults(options, {
        dbName: 'postgres',
        user: 'postgres',
        password: null,
        host: 'localhost',
        rows: 1000 * 1000
    });

    options.products = options.products || _.round(0.2 * options.rows)
    options.visitors = options.visitors || _.round(0.7 * options.rows)

    console.info('start to populate database');
    console.info(`database name: "${options.dbName}"`);
    console.info(`database user: "${options.user}"`);
    console.info(`database password: "${options.password}"`);
    console.info(`database host: "${options.host}"`);
    console.info(`rows count: ${options.rows}`);
    console.info(`unique products count: ${options.products}`);
    console.info(`unique visitors count: ${options.visitors}`);

    const db = await dbInit(options);

    const PageViews = definePageViews(db);
    const AtcClicks = defineAtcClicks(db, {ref: PageViews});

    await createTable(PageViews);
    await createTable(AtcClicks);

    await populate(options, PageViews, AtcClicks);
    await db.close();
};

async function populate(options, PageViews, AtcClicks) {
    const visitors = utils.idGenerator(options.visitors, 15);
    const products = utils.idGenerator(options.products, 10);

    const dateGenerator = utils.dateGenerator(DATE_RANGE);

    let pageViews = [];
    let atcClicks = [];

    const Progress = clui.Progress;
    const progressBar = new Progress(100);

    for(let i=1; i <= options.rows; i++) {
        const pageViewDate = dateGenerator.getRandomDate();

        pageViews.push({
            time: pageViewDate,
            productId: products.getRandomId(),
            visitorId: visitors.getRandomId(),
            browser: utils.getRandomBrowser(),
            url: utils.getRandomUrl()
        });

        if (Math.random() > 0.5) {
            const clicksAmount = Math.round(Math.random() * 6);

            for (let j=0; j<= clicksAmount; j++) {
                atcClicks.push({
                    impressionId: i,
                    clickId: randomize('0', 10),
                    localtime: new Date(pageViewDate.getTime() + 600 * 1000 * Math.random())
                });
            }
        }

        if (i % BATCH_SIZE === 0) {
            await Promise.all([
                PageViews.bulkCreate(pageViews),
                AtcClicks.bulkCreate(atcClicks)
            ]);
            pageViews = [];
            atcClicks = [];

            terminalOverwrite(progressBar.update(i, options.rows));
        }
    }
}

async function createTable(model) {
    try {
        await model.sync({force: true});
        console.info(`table "${model.getTableName()}" has been created successfully`);
    } catch(err) {
        console.error('Error occur while creating table');
        console.error(err);
    }
}
