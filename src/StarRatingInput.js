(function () {
    'use strict';

    var React = require('react'),

        clearingItem = function () {
            return React.DOM.a({
                className: 'star-rating-clear',
                title: 'Reset value to no stars',
                href: ''
            }, 'Clear');
        },

        starItem = function (value) {
            return React.DOM.span(
                {className: 'star-rating-star-container'},
                React.DOM.a({className: 'star-rating-star', title: value, href: ''}, value)
            );
        },

        starItems = function () {
            return [1, 2, 3, 4, 5].map(starItem);
        };

    module.exports = React.createClass({
        render: function () {
            return React.DOM.div(
                {className: 'star-rating-input'},
                [clearingItem()].concat(starItems())
            );
        }
    });
}());
