var fs = require('fs');
var _ = require('lodash');

function writeFile(file, data, callback) {
    if (!file || typeof file !== 'string') return callback(new Error('Invalid file argument'));
    if (!data || typeof data !== 'string') return callback(new Error('Invalid data argument'));

    fs.writeFile(file, data, 'utf-8', callback);
}

module.exports = _.curry(writeFile);
