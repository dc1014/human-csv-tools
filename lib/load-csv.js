var _ = require('lodash');
var csvStream = require('csv-stream');
var fs = require('fs');
var parseOptions = require('./parse-options');

function loadCsv(file, options, callback) {
    if (!file || typeof file !== 'string') return callback(new Error('Invalid file argument'));
    if (_.isPlainObject(options) !== true) return callback(new Error('Invalid options argument'));

    var dataArray = [];

    var csvOptions = parseOptions(options);

    var csvParser = csvStream.createStream(csvOptions);

    fs.createReadStream(file)
        .on('error', callback)
        .pipe(csvParser)
        .on('data', function (data) {
            dataArray.push(data);
        })
        .on('end', function () {
            return callback(null, dataArray);
        });
}

module.exports = _.curry(loadCsv);
