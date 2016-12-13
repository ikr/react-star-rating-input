describe('browser package index', function () {
    'use strict';

    var assert = require('assert'),
        bro = require('jsdom-test-browser'),
        api = require('../index'),
        browserApi = require('../browser');

    assert(bro);

    describe('just as the full API', function () {
        it('exports the component class', function () {
            assert.strictEqual(browserApi.Klass, api.Klass);
        });

        it('exports the css', function () {
            assert.strictEqual(browserApi.css, api.css);
        });
    });

    it('exports no intlMessages', function () {
        assert.strictEqual(typeof browserApi.intlMessages, 'undefined');
    });
});
