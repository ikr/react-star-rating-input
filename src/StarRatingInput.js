(function () {
    'use strict';

    var React = require('react');

    module.exports = React.createClass({
        render: function () {
            return React.DOM.div(
                {className: 'star-rating-input'},

                React.DOM.a({
                    className: 'star-rating-clear',
                    title: 'Reset value to no stars',
                    href: 'javascript:;'
                }, 'Clear')
            );
        }
    });
}());
