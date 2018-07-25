'use strict';

var React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const $ = window.$;
var GoustoModal = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps: function() {
		return {
			title: '',
			activePanel: 0,
			show: false,
			className: '',
			dialogClassName: '',
			fade: true,
			onHide: () => { return; },
			onShow: () => { return; },
			onBack: () => { return; },
		};
	},

	componentDidMount: function() {
		$(this.refs.modal).on('hidden.bs.modal', (e) => {
			this.props.onHide();
		});

		$(this.refs.modal).on('show.bs.modal', (e) => {
			this.props.onShow();
		});
	},

	componentDidUpdate: function(prevProps) {
		var modal = $(this.refs.modal);

		if (typeof modal.modal === 'function') {
			if (this.props.show && !prevProps.show) {
				modal.modal('show');
			} else {
				if (!this.props.show) {
					modal.modal('hide');
				}
			}
		}
	},

	render: function() {
		return (
			<div className={`modal gmodal ${this.props.fade ? 'fade ' : ''}${this.props.className}`} ref="modal" tabIndex="-1" role="dialog" aria-hidden="true">
				<div className={`modal-dialog ${this.props.dialogClassName}`}>
					<div className={`modal-content ${this.props.loading ? 'loading' : ''}`}>
						{(() => {
							if (this.props.enableBack) {
								return (
									<a role="button" className="control control-back" aria-hidden="true" onClick={this.props.onBack}>&lt; <span className="control-text">Back</span></a>
								)
							}
						})()}
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						{(() => {
							if (this.props.title !== '') {
								return (
									<div className="modal-header">
										<h4 className="modal-title">{this.props.title}</h4>
									</div>
								);
							}
						})()}

						{React.Children.map(this.props.children, (el, index) => {
							if (this.props.activePanel === index) {
								return el;
							}
						})}

					</div>
				</div>
			</div>
		);
	}
});

GoustoModal.Panel = require('./GoustoModalPanel');

module.exports = GoustoModal;
