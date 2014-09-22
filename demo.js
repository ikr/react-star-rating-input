(function () {
    'use strict';

    var React = require('react'),
        insertCss = require('insert-css'),
        StarRatingInput = require('./index'),

        Container = React.createClass({
            render: function () {
                var that = this;

                return StarRatingInput.Klass({
                    currentValue: this.state.currentValue,
                    prospectiveValue: this.state.prospectiveValue,
                    onChange: function (s) { that.setState(s); }
                });
            },

            getInitialState: function () {
                return {currentValue: 0, prospectiveValue: 0};
            }
        });

    insertCss(StarRatingInput.css);
    React.renderComponent(Container(), global.document.body);
}());
