describe('StarRatingInput instance', function () {
    'use strict';

    var assert = require('assert'),
        jsdom = require('jsdom'),
        TestUtils = require('react/addons').addons.TestUtils,
        StarRatingInput = require('../src/StarRatingInput'),

        props = function (currentValue, prospectiveValue) {
            return {currentValue: currentValue, prospectiveValue: prospectiveValue};
        },

        $;

    beforeEach(function (done) {
        global.document = jsdom.jsdom('<html><body></body></html>', jsdom.level(1, 'core'));
        global.window = global.document.parentWindow;

        jsdom.jQueryify(global.window, 'http://code.jquery.com/jquery-1.11.0.min.js', function () {
            $ = global.window.$;
            done();
        });
    });

    afterEach(function () {
        global.window.close();
    });

    describe('static markup', function () {
        var component;

        beforeEach(function () {
            component = TestUtils.renderIntoDocument(StarRatingInput(props(0, 0)));
        });

        it('has the root element\'s class assigned', function () {
            assert($(component.getDOMNode()).hasClass('star-rating-input'));
        });
    });
});
