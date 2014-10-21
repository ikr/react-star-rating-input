(function () {
    'use strict';

    var React = require('react'),
        insertCss = require('insert-css'),
        StarRatingInput = require('./index'),

        Container = React.createClass({
            render: function () {
                var that = this;

                return StarRatingInput.Klass({
                    value: this.state.value,
                    prospectiveValue: this.state.prospectiveValue,
                    onChange: function (s) { that.setState(s); }
                });
            },

            getInitialState: function () {
                return {value: 0, prospectiveValue: 0};
            }
        });

    insertCss(StarRatingInput.css);
    React.renderComponent(Container(), global.document.body);
}());
