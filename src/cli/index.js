'use strict';

const coa = require('coa');

module.exports = coa.Cmd()
    .name(process.argv[1])
    .title('videoly test task')
    .helpful()
    .cmd().name('populate').apply(require('./populate')).end();
