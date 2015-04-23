(function () {
    'use strict';

    var React = require('react'),
        IntlMixin = require('react-intl').IntlMixin,
        insertCss = require('insert-css'),
        StarRatingInput = require('./index'),

        Container = React.createClass({
            mixins: [IntlMixin],

            render: function () {
                return React.createElement(StarRatingInput.Klass, {
                    size: 5,
                    value: this.state.value,
                    onChange: function (value) { this.setState({value: value}); }.bind(this)
                });
            },

            getInitialState: function () {
                return {value: 0};
            }
        });

    insertCss(StarRatingInput.css);

    React.render(
        React.createElement(
            Container,
            {messages: StarRatingInput.intlMessages().en}
        ),

        global.document.body
    );
}());
