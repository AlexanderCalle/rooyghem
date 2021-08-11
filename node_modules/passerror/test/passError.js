var expect = require('unexpected').clone().use(require('unexpected-sinon')),
    sinon = require('sinon'),
    passError = require('../lib/passError');

describe('passError', function () {
    describe('called with a successCallback and an errorCallback', function () {
        var successCallback,
            errorCallback,
            cb;
        beforeEach(function () {
            successCallback = sinon.spy().named('successCallback');
            errorCallback = sinon.spy().named('errorCallback');
            cb = passError(errorCallback, successCallback);
        });

        it('should call the successCallback with the correct arguments on success', function () {
            cb(null, 1, 2, 3);
            expect(errorCallback, 'was not called');
            expect(successCallback, 'was called once');
            expect(successCallback, 'was called with', 1, 2, 3);
        });

        it('should call the errorCallback with the error on failure', function () {
            var err = new Error('foo');
            cb(err);
            expect(errorCallback, 'was called once');
            expect(errorCallback, 'was called with', err);
            expect(successCallback, 'was not called');
        });

        it('should throw an error if called again', function () {
            cb();
            expect(errorCallback, 'was not called');
            expect(successCallback, 'was called once');
            expect(cb, 'to throw exception', 'passError: The callback was called again with no error');
            expect(errorCallback, 'was not called');
            expect(successCallback, 'was called once');
        });

        it('should throw an error including the stack if called again with an error', function () {
            cb();
            expect(errorCallback, 'was not called');
            expect(successCallback, 'was called once');
            var err = new Error('testing testing 123');
            expect(function () {
                cb(err);
            }, 'to throw exception', 'passError: The callback was called again with ' + err.stack);
            expect(errorCallback, 'was not called');
            expect(successCallback, 'was called once');
        });
    });

    it('should throw an error when given wrong arguments', function () {
        [[1, 4], [{}, []], [], [function () {}], [null, function () {}]].forEach(function (args) {
            expect(function () {
                passError.apply(this, args);
            }, 'to throw exception', 'passError: Two function arguments required');
        });
    });
});
