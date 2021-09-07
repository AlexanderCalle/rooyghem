var unexpected = require('unexpected'),
    getTemporaryFilePath = require('../lib/getTemporaryFilePath'),
    sinon = require('sinon'),
    fs = require('fs'),
    os;

try {
    os = require('os');
} catch (e) {
    // Not available in older node.js versions
}

describe('getTemporaryFilePath', function () {
    var expect = unexpected.clone().installPlugin(require('unexpected-sinon'));

    afterEach(function () {
        delete getTemporaryFilePath.getTempDir.tempDir;
        sinon.restore();
    });

    describe('#getTempDir()', function () {
        describe('with no os.tmpdir', function () {
            beforeEach(function () {
                sinon.stub(os, 'tmpdir').value();
            });

            describe('in a win32 environment', function () {
                beforeEach(function () {
                    sinon.stub(process, 'platform').value('win32');
                });
                describe('with a TMP environment variable', function () {
                    beforeEach(function () {
                        sinon.stub(process, 'env').value({TMP:'C:\\blabla'});
                    });

                    it('should return the value of the TMP environment variable if fs.realpathSync says it exists', function () {
                        sinon.stub(fs, 'realpathSync').returnsArg(0);
                        expect(getTemporaryFilePath.getTempDir(), 'to equal', 'C:\\blabla');
                    });

                    it('should throw if fs.realpathSync says the TMP environment points to a non-existent dir', function () {
                        sinon.stub(fs, 'realpathSync').throws(new Error('ENOENT'));
                        expect(getTemporaryFilePath.getTempDir, 'to throw', 'ENOENT');
                    });
                });

                describe('with no TMP environment variable', function () {
                    beforeEach(function () {
                        sinon.stub(process, 'env').value({});
                    });

                    it('should return c:\\tmp if fs.realpathSync says it exists', function () {
                        sinon.stub(fs, 'realpathSync').returnsArg(0);
                        expect(getTemporaryFilePath.getTempDir(), 'to equal', 'c:\\tmp');
                        expect(fs.realpathSync, 'was called once');
                    });

                    it('should throw if fs.realpathSync says c:\\tmp does not exist', function () {
                        sinon.stub(fs, 'realpathSync').throws(new Error('ENOENT'));
                        expect(getTemporaryFilePath.getTempDir, 'to throw', 'ENOENT');
                        expect(fs.realpathSync, 'was called once');
                    });
                });
            });
        });
    });
});
