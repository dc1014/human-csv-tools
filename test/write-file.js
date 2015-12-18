var Code = require('code');
var fs = require('fs');
var Lab = require('lab');

var lab = exports.lab = Lab.script();

var expect = Code.expect;
var test = lab.test;

var writeFile = require('./../lib').writeFile;

var FILE = './write-file-test.csv';

lab.experiment('writeFile should', function () {
    test('throw if bad file argument', function (done) {
        writeFile(false, 'foo', function (err) {
            expect(err.message).to.equal('Invalid file argument');

            done();
        });
    });

    test('throw if bad data argument', function (done) {
        writeFile(FILE, false, function (err) {
            expect(err.message).to.equal('Invalid data argument');

            done();
        });
    });

    test('write file with proper arguments', function (done) {
        writeFile(FILE, 'foo', function (err) {
            fs.readFile(FILE, 'utf-8', function (err, data) {
                if (err) throw err;

                expect(data).to.equal('foo');
                done();
            });
        });
    });

    lab.after(function (done) {
        fs.unlink(FILE, function (err) {
            if (err) throw err;

            done();
        });
    });
});
