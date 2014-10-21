describe('StarRatingInput', function () {
    'use strict';

    var assert = require('assert'),
        sinon = require('sinon'),
        jsdom = require('jsdom'),
        TestUtils = require('react/addons').addons.TestUtils,
        StarRatingInput = require('../src/StarRatingInput'),

        props = function (value, onChange) {
            return {value: value, onChange: (onChange ? onChange : function () {})};
        },

        $;

    this.timeout(4000);

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

    ['value', 'onChange'].forEach(function (p) {
        it('declares the ' + p + ' property', function () {
            assert(StarRatingInput.propTypes[p]);
        });
    });

    describe('static markup', function () {
        var element;

        beforeEach(function () {
            element = TestUtils.renderIntoDocument(StarRatingInput(props(0))).getDOMNode();
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

            element = function (value, prospectiveValue) {
                var component = TestUtils.renderIntoDocument(StarRatingInput(props(value)));
                component.setState({prospectiveValue: prospectiveValue});
                return component.getDOMNode();
            };

        it('is done with the "on" class for current values', function () {
            assertState(element(3, 0), 3, 2, 0);
        });

        it('is done with the "suggested" class for prospective values', function () {
            assertState(element(4, 3), 0, 2, 3);
        });
    });

    describe('defaults', function () {
        var component;

        beforeEach(function () {
            component = TestUtils.renderIntoDocument(StarRatingInput({onChange: function () {}}));
        });

        it('include default value', function () {
            assert.strictEqual(component.props.value, 0);
        });

        it('include default prospective value', function () {
            assert.strictEqual(component.state.prospectiveValue, 0);
        });
    });

    describe('interactions', function () {
        var component,
            spy;

        beforeEach(function () {
            spy = sinon.spy();
            component = TestUtils.renderIntoDocument(StarRatingInput(props(1, spy)));
            component.setState({prospectiveValue: 2});
        });

        it('include signaling new prespective value on mouse hover for a star', function () {
            // TestUtils.Simulate.mouseEnter(component.refs.s4); doesn't work
            // -- that's a known issue https://github.com/facebook/react/issues/1297
            // therefore, here's a (hopefully) temporary workaround
            //
            TestUtils.SimulateNative.mouseOver(component.refs.s4);

            assert.strictEqual(spy.callCount, 0);
            assert.strictEqual(component.state.prospectiveValue, 4);
        });

        it('include signalling no prospective value on mouse leave for a star', function () {
            // TestUtils.Simulate.mouseLeave(component.refs.s2); doesn't work
            // -- that's a known issue https://github.com/facebook/react/issues/1297
            // therefore, here's a (hopefully) temporary workaround
            //
            TestUtils.SimulateNative.mouseOut(component.refs.s2);

            assert.strictEqual(spy.callCount, 0);
            assert.strictEqual(component.state.prospectiveValue, 0);
        });

        it('include signalling new current value on a star click', function () {
            TestUtils.Simulate.click(component.refs.s5);
            assert(spy.calledWith({value: 5}));
            assert.strictEqual(component.state.prospectiveValue, 0);
        });

        it('include signalling zero current value on a "Clear" link click', function () {
            TestUtils.Simulate.click(component.refs.s0);
            assert(spy.calledWith({value: 0}));
            assert.strictEqual(component.state.prospectiveValue, 0);
        });
    });
});
