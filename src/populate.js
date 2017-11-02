'use strict';

const Sequelize = require('sequelize');
const dbInit = require('./db');
const definePageViews = require('./pageviews');
const defineAtcClicks = require('./atc-clicks');

const debug = require('debug')('videoly:populate');

(async function populate() {
    const db = await dbInit({dbName: 'andrey'});

    const PageViews = definePageViews(db);
    const AtcClicks = defineAtcClicks(db, {ref: PageViews});

    await createTable(PageViews);
    await createTable(AtcClicks);
})();

async function createTable(model) {
    try {
        await model.sync({force: true});
        debug(`table has been created successfully`);
    } catch(err) {
        console.error('Error occur while creating table');
        console.error(err);
    }
}
