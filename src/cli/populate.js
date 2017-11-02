'use strict';

const populate = require('../populate');

module.exports = function() {
    this
        .title('populate').helpful()
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
        .opt()
        .name('rows').title('number of rows to populate')
        .short('rows').long('rows')
        .end()
        .opt()
        .name('products').title('number of unique products')
        .short('products').long('products')
        .end()
        .opt()
        .name('visitors').title('number of unique visitors')
        .short('visitors').long('visitors')
        .end()
        .act(function(options) {
            return populate(options);
        });
};
