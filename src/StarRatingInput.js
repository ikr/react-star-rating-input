(function () {
    'use strict';

    var React = require('react'),

        clearingItem = function () {
            return React.DOM.div(
                {className: 'star-rating-clear-container'},

                React.DOM.a({
                    className: 'star-rating-clear',
                    title: 'Reset value to no stars',
                    href: ''
                }, 'Clear')
            );
        },

        anchorState = function (value, props) {
            if (value <= props.currentValue) {
                return 'on';
            }

            return 'off';
        },

        additionalAnchorClass = function (state) {
            return (state === 'off' ? '' : (' ' + state));
        },

        starItem = function (value, state) {
            return React.DOM.div(
                {className: 'star-rating-star-container'},

                React.DOM.a({
                    className: 'star-rating-star' + additionalAnchorClass(state),
                    title: value,
                    href: ''
                }, value)
            );
        },

        starItems = function (props) {
            return [1, 2, 3, 4, 5].map(function (value) {
                return starItem(value, anchorState(value, props));
            });
        };

    module.exports = React.createClass({
        render: function () {
            return React.DOM.div(
                {className: 'star-rating-input'},
                [clearingItem()].concat(starItems(this.props))
            );
        }
    });
}());
