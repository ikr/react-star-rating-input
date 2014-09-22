(function () {
    'use strict';

    var React = require('react'),

        clearingItem = function () {
            return React.DOM.div(
                {className: 'star-rating-clear-container', key: 0},

                React.DOM.a({
                    className: 'star-rating-clear',
                    title: 'Reset value to no stars',
                    href: ''
                }, 'Clear')
            );
        };

    module.exports = React.createClass({
        render: function () {
            return React.DOM.div(
                {className: 'star-rating-input'},
                [clearingItem()].concat(this.starItems())
            );
        },

        starItems: function () {
            var that = this;

            return [1, 2, 3, 4, 5].map(function (value) {
                return that.starItem(value, that.anchorState(value));
            });
        },

        starItem: function (value, state) {
            var that = this;

            return React.DOM.div(
                {className: 'star-rating-star-container', key: value},

                React.DOM.a({
                    className: 'star-rating-star ' + state,
                    title: value,
                    href: '',
                    ref: 's' + value,

                    onMouseEnter: function () {
                        that.props.onChange({
                            currentValue: that.props.currentValue,
                            prospectiveValue: value
                        });
                    }
                }, value)
            );
        },

        anchorState: function (value) {
            if (this.props.prospectiveValue > 0) {
                return (value <= this.props.prospectiveValue ? 'suggested' : 'off');
            }

            return (value <= this.props.currentValue ? 'on' : 'off');
        }
    });
}());
