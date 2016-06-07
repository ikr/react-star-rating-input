(function () {
    'use strict';

    var React = require('react'),
        ReactDOM = require('react-dom'),
        insertCss = require('insert-css'),
        StarRatingInput = require('./index'),

        Container = React.createClass({
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

    ReactDOM.render(
        React.createElement(Container),
        global.document.getElementById('root')
    );
}());
