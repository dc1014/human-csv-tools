var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();

var parseOptions = require('./../lib').parseOptions;

var expect = Code.expect;
var test = lab.test;

lab.experiment('options parser should', function () {
    test('provide default options', function (done) {
        expect(parseOptions({}).delimiter).to.equal('|');

        done();
    });

    test('override default options', function (done) {
        var options = {delimiter: ',', enclosedChar: '"'};

        expect(parseOptions(options).delimiter).to.equal(',');
        expect(parseOptions(options).enclosedChar).to.equal('"');
        done();
    });
});
