var assert = require('assert');

(function () {
    'use strict';

    module.exports = {
        cssClass: function (element, className) {
            var cn = element.className;

            assert(
                cn.split(' ').indexOf(className) >= 0,
                '"' + className + '" not found in "' + cn + '"'
            );
        },

        noCssClass: function (element, className) {
            var cn = element.className;

            assert(
                cn.split(' ').indexOf(className) === -1,
                'Unexpected "' + className + '" in "' + cn + '"'
            );
        },

        contains: function (haystack, needle) {
            assert(
                haystack.indexOf(needle) >= 0, '"' + needle + '" not found in "' + haystack + '"');
        }
    };
}());
