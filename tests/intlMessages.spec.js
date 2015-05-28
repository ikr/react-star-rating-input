describe('intlMessages', function () {
    'use strict';

    var assert = require('assert'),
        intlMessages = require('../src/intlMessages');

    it('is a function', function () {
        assert.strictEqual(typeof intlMessages, 'function');
    });

    describe('react-star-rating-input namespace', function () {
        ['en', 'de'].forEach(function (locale) {
            ['clear', 'clearHint'].forEach(function (messageName) {
                it('defines ' + messageName + ' for ' + locale + ' locale', function () {
                    assert(intlMessages()[locale]['react-star-rating-input'][messageName]);
                });
            });
        });
    });
});
