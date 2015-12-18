const _ = require('lodash')

function parseOptions(options) {
    var defaults = {delimiter: '|'};

    return _.defaultsDeep(options, defaults);
}

module.exports = _.curry(parseOptions);
