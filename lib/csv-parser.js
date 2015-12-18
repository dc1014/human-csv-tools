var _ = require('lodash');
var csvStream = require('csv-stream');
var fs = require('fs');
var parseOptions = require('./parse-options');
var streamFile = require('./stream-file');

function csvParser(file, options) {
    if (!file || typeof file !== 'string') return new Error('Invalid file argument');
    if (_.isPlainObject(options) !== true) return new Error('Invalid options argument');

    var csvOptions = parseOptions(options);

    var csvParser = csvStream.createStream(csvOptions);

    return streamFile(file).pipe(csvParser);
}

module.exports = _.curry(csvParser);
