(function () {
    'use strict';

    var React = require('react'),
        api = require('./index'),
        insertCss = require('insert-css');

    insertCss(api.css);

    React.renderComponent(
        api.Klass({currentValue: 4, prospectiveValue: 0}),
        global.document.getElementById('container')
    );
}());
