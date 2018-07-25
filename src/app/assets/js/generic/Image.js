'use strict';

const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const classNames = require('classnames');

const CONFIG = require('../config');

function imagePath(name) {
	let path = 'images/' + name;

	if (window.goustoManifest && window.goustoManifest[path]) {
		path = window.goustoManifest[path];
	}
	return CONFIG.IMAGE_BASE_URL + '/' + path;
}

const Image = React.createClass({
	mixins: [PureRenderMixin],

	statics: {
		imagePath: imagePath
	},

	getDefaultProps: function() {
		return ({
			src: null,
			id: null,
			className: null,
			alt: null,
			lazy: false,
			srcSet: null
		});
	},

	render: function() {
		let srcs = this.props.src;
		if (srcs) {
			let className = classNames({'lazyload': this.props.lazy}, this.props.className);
			let image;
			if (srcs && typeof srcs === 'object') {
				let sizes = '';
				let srcSets = [];
				let sources = '<!--[if IE 9]><video style="display: none"><![endif]-->';
				sources += srcs.reduce((str, src) => {
					let srcSet = src.url + (src.pixelDensity ? ' ' + src.pixelDensity + 'x ' : '');
					srcSets.push(srcSet);
					sizes;
					return str += '<source data-srcset="' + srcSet +'" srcset="' + srcSet + '" />';
				}, '');
				sources += '<!--[if IE 9]></video><![endif]-->';
				sources += '<img src="' + imagePath('icons/transparent-pixel.png') + '" data-srcset="' + srcSets.join(', ') + '" srcset="' + srcSets.join(', ') + '" alt="' + (this.props.alt ? this.props.alt : '') + '" class="' + className + '" />';
				image = <picture dangerouslySetInnerHTML={{__html: sources}} />
			} else {
				image = <img src={srcs} id={this.props.id} className={className} srcSet={this.props.srcSet} alt={this.props.alt} />
			}
			return image;
		} else {
			return <span></span>;
		}
	}
});

module.exports = Image;
