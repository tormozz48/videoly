'use strict';

const conversion = require('../conversion');

module.exports = function() {
    this
        .title('conversion').helpful()
        .opt()
        .name('dbName').title('database name')
        .short('dbName').long('dbName')
        .req()
        .end()
        .opt()
        .name('user').title('database user name')
        .short('dbUser').long('dbUser')
        .end()
        .opt()
        .name('password').title('database user password')
        .short('dbPassword').long('dbPassword')
        .end()
        .opt()
        .name('host').title('database host')
        .short('dbHost').long('dbHost')
        .end()
        .act((options) => conversion(options));
};
