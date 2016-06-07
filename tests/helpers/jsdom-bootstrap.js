var jsdom = require('jsdom').jsdom;

var doc = jsdom('<html><body></body></html>');
var win = doc.defaultView;

/* global global */

global.window = win;
global.document = win.document;
global.navigator = win.navigator;
