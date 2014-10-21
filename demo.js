(function () {
    'use strict';

    var React = require('react'),
        insertCss = require('insert-css'),
        StarRatingInput = require('./index'),

        Container = React.createClass({
            render: function () {
                return StarRatingInput.Klass({
                    value: this.state.value,
                    onChange: function (s) { this.setState(s); }.bind(this)
                });
            },

            getInitialState: function () {
                return {value: 0};
            }
        });

    insertCss(StarRatingInput.css);
    React.renderComponent(Container(), global.document.body);
}());
