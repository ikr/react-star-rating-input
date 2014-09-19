(function () {
    'use strict';

    var React = require('react'),

        clearingItem = function () {
            return React.DOM.div(
                {className: 'star-rating-clear-container', key: 's0'},

                React.DOM.a({
                    className: 'star-rating-clear',
                    title: 'Reset value to no stars',
                    href: ''
                }, 'Clear')
            );
        },

        anchorState = function (value, props) {
            if (props.prospectiveValue > 0) {
                return (value <= props.prospectiveValue ? 'suggested' : 'off');
            }

            return (value <= props.currentValue ? 'on' : 'off');
        },

        starItem = function (value, state) {
            return React.DOM.div(
                {className: 'star-rating-star-container'},

                React.DOM.a({
                    className: 'star-rating-star ' + state,
                    title: value,
                    href: '',
                    key: 's' + value
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
