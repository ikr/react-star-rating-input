describe('StarRatingInput instance', function () {
    'use strict';

    var assert = require('assert'),
        jsdom = require('jsdom'),
        TestUtils = require('react/addons').addons.TestUtils,
        StarRatingInput = require('../src/StarRatingInput'),

        props = function (currentValue, prospectiveValue) {
            return {
                currentValue: currentValue,
                prospectiveValue: prospectiveValue,
                onChange: function () {}
            };
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
        var element;

        beforeEach(function () {
            element = TestUtils.renderIntoDocument(StarRatingInput(props(0, 0))).getDOMNode();
        });

        it('has the root element\'s class assigned', function () {
            assert($(element).hasClass('star-rating-input'));
        });

        it('has the "Clear" link', function () {
            assert.strictEqual($('a.star-rating-clear', element).text(), 'Clear');
        });

        it('has the 5 star items', function () {
            assert.strictEqual($('.star-rating-star-container', element).size(), 5);
        });
    });

    describe('state indication', function () {
        var assertState = function (element, onCount, offCount, suggestedCount) {
                assert.strictEqual($('.star-rating-star-container a.on', element).size(), onCount);

                assert.strictEqual(
                    $('.star-rating-star-container a.off', element).size(), offCount);

                assert.strictEqual(
                    $('.star-rating-star-container a.suggested', element).size(), suggestedCount);
            },

            element = function (currentValue, prospectiveValue) {
                return TestUtils.renderIntoDocument(
                    StarRatingInput(props(currentValue, prospectiveValue))
                ).getDOMNode();
            };

        it('is done with the "on" class for current values', function () {
            assertState(element(3, 0), 3, 2, 0);
        });

        it('is done with the "suggested" class for prospective values', function () {
            assertState(element(4, 3), 0, 2, 3);
        });
    });
});
