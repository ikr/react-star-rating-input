(function () {
    'use strict';

    var React = require('react'),

        state = function (currentValue, prospectiveValue) {
            return {currentValue: currentValue, prospectiveValue: prospectiveValue};
        };

    module.exports = React.createClass({
        render: function () {
            return React.DOM.div(
                {className: 'star-rating-input'},
                [this.clearingItem()].concat(this.starItems())
            );
        },

        clearingItem: function () {
            var that = this;

            return React.DOM.div(
                {className: 'star-rating-clear-container', key: 0},

                React.DOM.a({
                    className: 'star-rating-clear',
                    title: 'Reset value to no stars',
                    href: '',
                    ref: 's0',

                    onClick: function () {
                        that.props.onChange(state(0, 0));
                    }
                }, 'Clear')
            );
        },

        starItems: function () {
            var that = this;

            return [1, 2, 3, 4, 5].map(function (value) {
                return that.starItem(value, that.anchorMode(value));
            });
        },

        starItem: function (value, mode) {
            var that = this;

            return React.DOM.div(
                {className: 'star-rating-star-container', key: value},

                React.DOM.a({
                    className: 'star-rating-star ' + mode,
                    title: value,
                    href: '',
                    ref: 's' + value,

                    onMouseEnter: function () {
                        that.props.onChange(state(that.props.currentValue, value));
                    },

                    onMouseLeave: function () {
                        that.props.onChange(state(that.props.currentValue, 0));
                    },

                    onClick: function () {
                        that.props.onChange(state(value, 0));
                    }
                }, value)
            );
        },

        anchorMode: function (value) {
            if (this.props.prospectiveValue > 0) {
                return (value <= this.props.prospectiveValue ? 'suggested' : 'off');
            }

            return (value <= this.props.currentValue ? 'on' : 'off');
        }
    });
}());
