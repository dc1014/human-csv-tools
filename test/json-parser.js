var Code = require('code');
var fs = require('fs');
var Lab = require('lab');
var util = require('util');

var lab = exports.lab = Lab.script();

var expect = Code.expect;
var test = lab.test;

var jsonParser = require('./../lib').jsonParser;

var data = {foo: 'bar', baz: 1};
var options = {del: '|'};
var badData = {};

lab.experiment('jsonParser should', function () {
    test('throw if options is not object', function (done) {
        jsonParser(false, function (err, csv) {
            expect(err.message).to.equal('Invalid json parser options');

            done();
        });
    });

    test('throw if data is not an array', function (done) {
        jsonParser({data: false}, function (err, csv) {
            expect(err.message).to.equal('Invalid json parser data');

            done();
        });

    });

    test('throw if data is malformed', function (done) {
        jsonParser({data: ['foo']}, function (err, csv) {
            expect(err.message).to.equal('params should include "fields" and/or non-empty "data" array of objects');

            done();
        });
    });

    test('parse json values to csv', function (done) {
        jsonParser({data: [{foo: 'bar'}]}, function (err, csv) {
            expect(csv).to.equal("\"foo\"\n\"bar\"");

            done();
        });
    });
});
