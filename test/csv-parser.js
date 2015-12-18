var Code = require('code');
var fs = require('fs');
var Lab = require('lab');
var util = require('util');

var lab = exports.lab = Lab.script();

var expect = Code.expect;
var test = lab.test;

var csvParser = require('./../lib').csvParser;

lab.experiment('csvParser should', function () {
    test('throw if bad file argument', function(done) {
        expect(csvParser(false, {}).message).to.equal('Invalid file argument');

        done();
    });

    test('throw if bad options argument', function(done) {
        expect(csvParser('./test/test.csv', 'potato').message).to.equal('Invalid options argument');

        done();
    });

    lab.before(function (done) {
        var csvHeaders = 'field1|field2|field3\n';
        var csvValues = 'potato|1|false\napple|foo|3';
        fs.writeFile('./test/parser-test.csv', csvHeaders + csvValues, 'utf-8', function (err) {
            if (err) throw err;

            done();
        });
    });

    test('stream csv after read', function (done) {
        var rows = [];
        csvParser('./test/parser-test.csv', {})
            .on('data', function (row) {
                rows.push(row);
            })
            .on('close', function () {
                expect(rows[1].field1).to.equal('apple');
                expect(rows[1].field2).to.equal('foo');
                expect(rows[1].field3).to.equal('3');

                done();
            });
    });

    lab.after(function (done) {
        fs.unlink('./test/parser-test.csv', function (err) {
            if (err) throw err;
            done();
        });
    });
});
