var _ = require('lodash');
var json2csv = require('json2csv');

function jsonParser(options, callback) {
    if (_.isPlainObject(options) !== true) return callback(new Error('Invalid json parser options'));
    if (_.isArray(options.data) !== true) return callback(new Error('Invalid json parser data'));

    json2csv(options, function (err, csv) {
        if (err) return callback(err);

        return callback(null, csv);
    });
}

module.exports = _.curry(jsonParser);
