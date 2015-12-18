var _ = require('lodash');
var fs = require('fs');
var jsonParser = require('./json-parser');
var writeFile = require('./write-file');

function autoWrite(file, fields, resultsKey, callback, results) {
    if (!file || typeof file !== 'string') return callback(new Error('Invalid file argument'));
    if (_.isArray(fields) !== true) return callback(new Error('Invalid csv fields'));
    if (!resultsKey || typeof resultsKey !== 'string') return callback(new Error('Invalid results key'));

    jsonParser({data: results[resultsKey], del: '|', fields: fields}, function (err, csv) {
        if (err) return callback(err);

        return writeFile(file, csv, callback);
    });
}

module.exports = _.curry(autoWrite);
