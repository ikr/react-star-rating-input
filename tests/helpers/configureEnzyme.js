const {JSDOM} = require('jsdom')
const {configure} = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

const jsdom = new JSDOM('<html><body><div id="main"></div></body></html>')
global.window = jsdom.window
global.document = jsdom.window.document
global.navigator = jsdom.window.navigator

configure({adapter: new Adapter()})
