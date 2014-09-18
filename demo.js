/* jshint newcap:false */

(function () {
    'use strict';

    var React = require('react'),
        StarRatingInput = require('./src/StarRatingInput');

    React.renderComponent(StarRatingInput({}), global.document.getElementById('container'));
}());
