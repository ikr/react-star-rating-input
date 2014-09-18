/* jshint newcap:false */

describe('StarRatingInput', function () {
    'use strict';

    var assert = require('assert'),
        jsdom = require('jsdom'),
        TestUtils = require('react/addons').addons.TestUtils,
        StarRatingInput = require('../src/StarRatingInput'),
        component,
        $;

    beforeEach(function (done) {
        global.document = jsdom.jsdom('<html><body></body></html>', jsdom.level(1, 'core'));
        global.window = global.document.parentWindow;

        jsdom.jQueryify(global.window, 'http://code.jquery.com/jquery-1.11.0.min.js', function () {
            component = TestUtils.renderIntoDocument(StarRatingInput({}));
            $ = global.window.$;
            done();
        });
    });

    afterEach(function () {
        global.window.close();
    });

    it('is rendered with the root element\'s class assigned', function () {
        assert($(component.getDOMNode()).hasClass('star-rating-input'));
    });
});
