'use strict';

const Url = require('url');
const _ = require('lodash');
const RandExp = require('randexp');

const PROTOCOLS = ['http:', 'https:'];
const HOSTS = [
    'localhost', '127.0.0.2', 'google.com',
    'shop1.com', 'shop2.com', 'www.shop1.com',
    'www.google.com', 'shop4.ru', 'www3.shop4.ru'
];

const randExp = new RandExp(/\w{1,10}(\/\w{1,10}){0,2}?/);

module.exports = () => {
    const protocol = _.sample(PROTOCOLS);
    const host = _.sample(HOSTS);

    return Url.format({
        protocol,
        host,
        pathname: randExp.gen()
    });
};
