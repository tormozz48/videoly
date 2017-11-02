'use strict';

const Url = require('url');
const _ = require('lodash');
const RandExp = require('randexp');
const randomize = require('randomatic');

const PROTOCOLS = ['http:', 'https:'];
const HOSTS = [
    'localhost', '127.0.0.2', 'google.com',
    'shop1.com', 'shop2.com', 'www.shop1.com',
    'www.google.com', 'shop4.ru', 'www3.shop4.ru'
];
const BROWSERS = ['chrome', 'firefox', 'ie9', 'ie10', 'ie11', 'edge', 'safary'];

const randExp = new RandExp(/\w{1,10}(\/\w{1,10}){0,2}?/);

function getRandomBrowser() {
    return _.sample(BROWSERS);
}

function getRandomUrl() {
    return Url.format({
        protocol: _.sample(PROTOCOLS),
        host: _.sample(HOSTS),
        pathname: randExp.gen()
    });
}

function idGenerator(amount, length = 10, chars = 'Aa') {
    let set = [];

    for (let i = 0; i <= amount; i++) {
        set.push(randomize(chars, length));
    }

    return {
        getRandomId: () => _.sample(set)
    };
}

function dateGenerator({start, end}) {
    const startDate = start.getTime();
    const endDate = end.getTime();
    const diff = endDate - startDate;

    return {
        getRandomDate: () => new Date(startDate + Math.round(Math.random() * diff))
    };
}

module.exports = {
    getRandomBrowser,
    getRandomUrl,
    idGenerator,
    dateGenerator
};
