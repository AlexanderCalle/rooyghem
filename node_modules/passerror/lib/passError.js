(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.passError = factory();
    }
}(this, function () {
    return function passError(errorCallback, successCallback) {
        if (typeof errorCallback !== 'function' || typeof successCallback !== 'function') {
            throw new Error('passError: Two function arguments required');
        }
        var called = false;
        return function (err) { // ...
            if (called) {
                throw new Error('passError: The callback was called again with ' + (err ? err.stack : 'no error'));
            }
            called = true;
            if (err) {
                errorCallback(err);
            } else {
                for (var length = arguments.length, rest = Array(length > 1 ? length - 1 : 0), i = 1; i < length; i++) {
                    rest[i - 1] = arguments[i];
                }

                successCallback.apply(this, rest);
            }
        };
    };
}));
