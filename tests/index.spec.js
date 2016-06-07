describe('package index', function () {
    'use strict';

    var assert = require('assert'),
        api = require('../index');

    it('exports the component class', function () {
        assert(api.Klass);
    });

    it('exports non-empty css', function () {
        assert(api.css);
        assert(/[a-z]+/.test(api.css));
    });
});
