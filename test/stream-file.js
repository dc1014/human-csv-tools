var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();

var expect = Code.expect;
var test = lab.test;

var streamFile = require('./../lib').streamFile;

lab.experiment('streamFile should', function () {
    test('throw if bad file argument', function (done) {
        expect(streamFile(false).message).to.equal('Invalid file argument');

        done();
    });


    test('throw if no file exists', function(done) {
        streamFile('badFile.csv')
            .on('error', function (err) {
                expect(err.message).to.equal("ENOENT: no such file or directory, open 'badFile.csv'");
                done();
            });
    });
});
