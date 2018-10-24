import React from 'react'
import classNames from 'classnames'
import css from './CheckBox.css'
import InputWrapper from 'Form/InputWrapper'

export class CheckBox extends React.PureComponent {
	static propTypes = {
		additionalProps: React.PropTypes.object,
		onChange: React.PropTypes.func,
		className: React.PropTypes.string,
		labelClassName: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		required: React.PropTypes.bool,
		checked: React.PropTypes.bool,
		label: React.PropTypes.string.isRequired,
		name: React.PropTypes.string,
		'data-testing': React.PropTypes.string,
		style: React.PropTypes.oneOf([
			'',
			'disclaimer',
		]),
	}

	defaultProps = {
		additionalProps: {},
		labelClassName: '',
		className: '',
		disabled: false,
		required: false,
		checked: false,
		style: '',
	}

	handleChange = (e) => {
		if (this.props.onChange) {
			this.props.onChange(e.target.checked)
		}
	}

	render = () => (
		<span
			className={classNames(
				css.container,
				{
					[css[this.props.style]]: this.props.style,
				}
			)}
		>
			<label className={this.props.labelClassName || css.label}>
				<input
					{...this.props.additionalProps}
					className={classNames(
						css.input,
						this.props.className
					)}
					disabled={this.props.disabled}
					onChange={this.handleChange}
					required={this.props.required}
					type="checkbox"
					checked={this.props.checked}
					name={this.props.name}
					data-testing={this.props['data-testing']}
				/>
				<span className={css.indicator} />
				<span className={css.text}>{this.props.label}</span>
			</label>
		</span>
	)

}

export default InputWrapper(CheckBox)
