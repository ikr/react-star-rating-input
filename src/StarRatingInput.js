(function () {
    'use strict';

    var React = require('react');

    module.exports = React.createClass({
        render: function () {
            return React.DOM.span({className: 'star-rating-input'}, 'Hey there!');
        }
    });
}());
