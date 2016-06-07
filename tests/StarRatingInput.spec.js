describe('StarRatingInput', function () {
    'use strict';

    var assert = require('assert'),
        sinon = require('sinon'),
        React = require('react'),
        ReactDOM = require('react-dom'),
        TestUtils = require('react-addons-test-utils'),
        massert = require('./helpers/massert'),
        StarRatingInput = require('../src/StarRatingInput'),

        props = function (value, size, showClear, onChange) {
            return {
                value: value,
                size: size || 5,
                showClear: showClear,
                onChange: (onChange ? onChange : function () {})
            };
        };

    ['value', 'onChange'].forEach(function (p) {
        it('declares the ' + p + ' property', function () {
            assert(StarRatingInput.propTypes[p]);
        });
    });

    describe('static markup', function () {
        var element = function (size, showClear) {
            return ReactDOM.findDOMNode(
                TestUtils.renderIntoDocument(
                    React.createElement(StarRatingInput, props(0, size, showClear))
                )
            );
        };

        it('has the root element\'s class assigned', function () {
            massert.cssClass(element(), 'star-rating-input');
        });

        it('has the "Clear" link', function () {
            var aClear = element().querySelector('a.star-rating-clear');

            assert.strictEqual(aClear.textContent, 'Clear');
            assert(!aClear.hasAttribute('style'));
        });

        it('does not have "Clear" link when showClear is false', function () {
            assert.strictEqual(element(5, false).querySelector('a.star-rating-clear'), null);
        });

        it('has the 5 star items as default', function () {
            assert.strictEqual(element().querySelectorAll('.star-rating-star-container').length, 5);
        });

        it('has the N star items', function () {
            assert.strictEqual(
                element(10).querySelectorAll('.star-rating-star-container').length, 10);
        });
    });

    describe('state indication', function () {
        var assertState = function (element, onCount, offCount, suggestedCount) {
                assert.strictEqual(
                    element.querySelectorAll('.star-rating-star-container a.on').length, onCount);

                assert.strictEqual(
                    element.querySelectorAll('.star-rating-star-container a.off').length, offCount);

                assert.strictEqual(
                    element.querySelectorAll('.star-rating-star-container a.suggested').length,
                    suggestedCount
                );
            },

            element = function (value, prospectiveValue) {
                var component = TestUtils.renderIntoDocument(
                    React.createElement(StarRatingInput, props(value))
                );

                component.setState({prospectiveValue: prospectiveValue});
                return ReactDOM.findDOMNode(component);
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
            component = TestUtils.renderIntoDocument(
                React.createElement(StarRatingInput, props())
            );
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

            component = TestUtils.renderIntoDocument(
                React.createElement(StarRatingInput, props(1, 5, true, spy))
            );

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
            assert(spy.calledWith(5));
            assert.strictEqual(component.state.prospectiveValue, 0);
        });

        it('include signalling zero current value on a "Clear" link click', function () {
            TestUtils.Simulate.click(component.refs.s0);
            assert(spy.calledWith(0));
            assert.strictEqual(component.state.prospectiveValue, 0);
        });
    });

    describe('translations support', function () {
        var element = function (size, showClear) {
                var properties = props(0, size, showClear);

                properties.clearLabel = 'Очистить';
                properties.clearHint = 'Сбросить';

                return ReactDOM.findDOMNode(
                    TestUtils.renderIntoDocument(
                        React.createElement(StarRatingInput, properties)
                    )
                );
            };

        it('includes link text', function () {
            assert.strictEqual(
                element().querySelector('a.star-rating-clear').textContent, 'Очистить');
        });

        it('includes link title', function () {
            assert.strictEqual(
                element().querySelector('a.star-rating-clear').getAttribute('title'), 'Сбросить');
        });
    });
});
