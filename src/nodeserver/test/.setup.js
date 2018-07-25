require('babel-polyfill');

var jsdom = require('jsdom');
global.window = new jsdom.JSDOM().window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.navigator = window.navigator;
global.location = window.location;

global.navigator = {
	userAgent: 'node.js'
};

documentRef = document;

global.window.matchMedia = global.window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    }
}
