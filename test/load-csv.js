var Code = require('code');
var fs = require('fs');
var Lab = require('lab');

var lab = exports.lab = Lab.script();

var loadCsv = require('./../lib').loadCsv;

var expect = Code.expect;

var test = lab.test;

lab.experiment('loadCsv should', function () {
    test('throw if bad file argument', function(done) {
        loadCsv(false, {}, function (err, csv) {
            expect(err.message).to.equal('Invalid file argument');
            expect(csv).to.be.undefined();

            done();
        });
    });

    test('throw if bad options argument', function(done) {
        loadCsv('./test/test.csv', 'potato', function (err, csv) {
            expect(err.message).to.equal('Invalid options argument');
            expect(csv).to.be.undefined();

            done();
        });
    });

    test('throw if no file exists', function(done) {
        loadCsv('badFile.csv', {}, function (err, csv) {
            expect(err.message).to.equal("ENOENT: no such file or directory, open 'badFile.csv'");

            done();
        });
    });

    lab.before(function (done) {
        var csvHeaders = 'field1|field2|field3\n';
        var csvValues = 'potato|1|false';
        fs.writeFile('./test/load-test.csv', csvHeaders + csvValues, 'utf-8', function (err) {
            if (err) throw err;

            done();
        });
    });

    test('read csv with default values', function (done) {
        loadCsv('./test/load-test.csv', {}, function (err, csv) {
            expect(err).to.be.null();

            expect(csv[0].field1).to.equal('potato');
            expect(csv[0].field2).to.equal('1');
            expect(csv[0].field3).to.equal('false');

            done();
        });
    });

    lab.after(function (done) {
        fs.unlink('./test/load-test.csv', function (err) {
            if (err) throw err;
            done();
        });
    });
});
