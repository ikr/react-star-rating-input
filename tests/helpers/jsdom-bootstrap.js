var JSDOM = require('jsdom').JSDOM;

var doc = new JSDOM('<html><body></body></html>');
var win = doc.window;

/* global global */

global.window = win;
global.document = win.document;
global.navigator = win.navigator;
