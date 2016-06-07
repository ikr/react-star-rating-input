(function () {
    'use strict';

    var React = require('react');

    module.exports = React.createClass({
        propTypes: {
            value: React.PropTypes.number,
            onChange: React.PropTypes.func,
            showClear: React.PropTypes.bool
        },

        getDefaultProps: function () {
            return {
                value: 0,
                size: 5,
                showClear: true,
                clearLabel: 'Clear',
                clearHint: 'Reset value to no stars'
            };
        },

        getInitialState: function () {
            return {prospectiveValue: 0};
        },

        render: function () {
            return React.createElement(
                'div',
                {className: 'star-rating-input'},
                this.clearingItems().concat(this.starItems())
            );
        },

        clearingItems: function () {
            if (!this.props.showClear) {
                return [];
            }

            return [React.createElement(
                'div',
                {className: 'star-rating-clear-container', key: 0},

                React.createElement('a', {
                    className: 'star-rating-clear',
                    title: this.props.clearHint,
                    href: '',
                    ref: 's0',

                    onClick: function (e) {
                        e.preventDefault();
                        this.setState({prospectiveValue: 0});
                        this.props.onChange(0);
                    }.bind(this)
                }, this.props.clearLabel)
            )];

        },

        starItems: function () {
            var stars = [],
                i;
            for (i = 1; i <= this.props.size; i += 1) {
                stars.push(this.starItem(i, this.anchorMode(i)));
            }
            return stars;
        },

        starItem: function (value, mode) {
            return React.createElement(
                'div',
                {className: 'star-rating-star-container', key: value},

                React.createElement('a', {
                    className: 'star-rating-star ' + mode,
                    title: value,
                    href: '',
                    ref: 's' + value,

                    onMouseEnter: function () {
                        this.setState({prospectiveValue: value});
                    }.bind(this),

                    onMouseLeave: function () {
                        this.setState({prospectiveValue: 0});
                    }.bind(this),

                    onClick: function (e) {
                        e.preventDefault();
                        this.setState({prospectiveValue: 0});
                        this.props.onChange(value);
                    }.bind(this)
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
