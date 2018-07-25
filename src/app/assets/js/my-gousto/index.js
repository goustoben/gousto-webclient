'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Gousto = require('@fe/gousto-generic');
const CONFIG = require('@fe/gousto-config');

const MyGoustoContainer = require('./components/MyGoustoContainer');

let data = window.pageData ? window.pageData : null;

Gousto.globalAjaxSetup(CONFIG, data);

let widgetList = window._optimizely_widgetList || CONFIG.MY_GOUSTO.WIDGET_LIST;

ReactDOM.render(
	<MyGoustoContainer data={data} widgetList={widgetList} widgets={CONFIG.MY_GOUSTO.WIDGETS} />,
	document.getElementById('my-gousto')
);
