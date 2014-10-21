(function () {
    'use strict';

    var React = require('react');

    module.exports = React.createClass({
        propTypes: {
            value: React.PropTypes.number,
            onChange: React.PropTypes.func
        },

        getDefaultProps: function () {
            return {value: 0};
        },

        getInitialState: function () {
            return {prospectiveValue: 0};
        },

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

                    onClick: function (e) {
                        e.preventDefault();
                        that.setState({prospectiveValue: 0});
                        that.props.onChange({value: 0});
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
                        that.setState({prospectiveValue: value});
                    },

                    onMouseLeave: function () {
                        that.setState({prospectiveValue: 0});
                    },

                    onClick: function (e) {
                        e.preventDefault();
                        that.setState({prospectiveValue: 0});
                        that.props.onChange({value: value});
                    }
                }, value)
            );
        },

        anchorMode: function (value) {
            if (this.state.prospectiveValue > 0) {
                return (value <= this.state.prospectiveValue ? 'suggested' : 'off');
            }

            return (value <= this.props.value ? 'on' : 'off');
        }
    });
}());
