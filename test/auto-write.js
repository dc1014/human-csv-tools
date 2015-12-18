var Code = require('code');
var fs = require('fs');
var Lab = require('lab');
var util = require('util');

var lab = exports.lab = Lab.script();

var expect = Code.expect;
var test = lab.test;

var autoWrite = require('./../lib').autoWrite;

var FILE = './foo.csv';

lab.experiment('autoWrite should', function () {
    test('throw if file argument is not a string', function (done) {
        autoWrite(false, [], 'potato', function(err) {
            expect(err.message).to.equal('Invalid file argument');
            done();
        }, {});
    });

    test('throw if fields is not an array', function (done) {
        autoWrite(FILE, false, 'potato', function(err) {
            expect(err.message).to.equal('Invalid csv fields');
            done();
        }, {});
    });

    test('throw if results key is not a string', function (done) {
        autoWrite(FILE, [], false, function(err) {
            expect(err.message).to.equal('Invalid results key');
            done();
        }, 'foo');
    });

    test('throw if data is malformed', function (done) {
        autoWrite(FILE, [], 'key', function (err) {
            expect(err.message).to.equal('Invalid json parser data');

            done();
        }, []);
    });

    test('write data with correct options', function (done) {
        autoWrite(FILE, ['foo'], 'autoKey', function (err) {
            fs.readFile(FILE, 'utf-8', function (err, data) {
                if (err) throw err;

                expect(data).to.equal("\"foo\"\n\"bar\"");

                done();
            });
        }, {autoKey: [{foo: 'bar'}]});
    });

    lab.after(function (done) {
        fs.unlink(FILE, function (err) {
            if (err) throw err;

            done();
        });
    });
});
