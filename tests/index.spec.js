describe('package index', function () {
    'use strict';

    var assert = require('assert'),
        bro = require('jsdom-test-browser'),
        api = require('../index'),
        intlMessages = require('../src/intlMessages');

    assert(bro);

    it('exports the component class', function () {
        assert(api.Klass);
    });

    it('exports non-empty css', function () {
        assert(api.css);
        assert(/[a-z]+/.test(api.css));
    });

    it('exports the intlMessages', function () {
        assert.strictEqual(api.intlMessages, intlMessages);
    });
});
