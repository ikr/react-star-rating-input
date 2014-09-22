(function () {
    'use strict';

    var React = require('react'),
        api = require('./index'),
        insertCss = require('insert-css');

    insertCss(api.css);

    React.renderComponent(
        api.Klass({currentValue: 3, prospectiveValue: 2, onChange: function () { console.dir(arguments[0]); }}),
        global.document.getElementById('container')
    );
}());
