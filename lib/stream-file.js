var fs = require('fs');
var _ = require('lodash');

function streamFile(file) {
    if (!file || typeof file !== 'string') return new Error('Invalid file argument');

    return fs.createReadStream(file);
}

module.exports = _.curry(streamFile);
