import React from 'react'
import css from './DropdownInput.css'
import globalCss from './reactSelect.css' // eslint-disable-line no-unused-vars
import Select from 'react-select'
import classNames from 'classnames'
import restrictProps from 'utils/restrictProps'
import InputWrapper from 'Form/InputWrapper'

export class DropdownInput extends React.Component {

	static propTypes = {
		additionalProps: React.PropTypes.object,
		options: React.PropTypes.array,
		onChange: React.PropTypes.func,
		color: React.PropTypes.oneOf(['primary', 'secondary']),
		value: React.PropTypes.any,
		subLabelClassName: React.PropTypes.string,
		labelClassName: React.PropTypes.string,
		required: React.PropTypes.bool,
		className: React.PropTypes.string,
		uppercase: React.PropTypes.bool,
		dataTesting: React.PropTypes.string,
	}

	static defaultProps = {
		additionalProps: {},
		options: [],
		required: false,
		color: 'primary',
		uppercase: false,
	}

	handleChange = (obj) => {
		if (this.props.onChange) {
			this.props.onChange(JSON.parse(obj.value))
		}
	}

	nativeChanged = (e) => {
		this.handleChange(e.target)
	}

	mapToSelect = (options) => (
		options.map((option) => ({
			value: JSON.stringify(option.value),
			label: (
				<span className={classNames(this.props.labelClassName, (option.labelClassName) ? option.labelClassName : '', { [css.disabled]: option.disabled })}>
					{option.label}
					<span className={classNames(css.subLabel, this.props.subLabelClassName)}> {option.subLabel}</span>
					{option.icon ? <span className={css[`icon-${option.icon}`]}></span> : null}
				</span>),
			disabled: option.disabled,
		}))
	)

	mapToNative = (options) => (
		options.map(
			(option) => (
				<option key={JSON.stringify(option.value)} value={JSON.stringify(option.value)} disabled={option.disabled}>
					{option.label} {(typeof option.subLabel === 'string') ? option.subLabel : ''}
				</option>)
			)
	)

	renderNative = (options) => (
		<div>
			<select
				{...this.props.additionalProps}
				className={classNames(css.native, css[this.props.color], this.props.uppercase && css.selectuppercase)}
				onChange={this.nativeChanged}
				value={JSON.stringify(this.props.value)}
				required={this.props.required}
				data-testing={this.props.dataTesting}
			>
				{this.mapToNative(options)}
			</select>
			<span className={classNames(css.nativeSelectArrow, css[this.props.color])}></span>
		</div>
	)

	renderSelect = (options, props) => (
		<div className={classNames(css.select, css[this.props.color], this.props.uppercase && css.selectuppercase)}>
			<Select
				{...this.props.additionalProps}
				options={this.mapToSelect(options)}
				onChange={this.handleChange}
				value={JSON.stringify(this.props.value)}
				required={this.props.required}
				{...props}
				data-testing={this.props.dataTesting}
			/>
		</div>
	)

	render = () => {
		const defaultProps = {
			clearable: false,
			searchable: false,
			placeholder: '',
		}
		const ourProps = [
			'options',
			'onChange',
			'className',
			'value',
			'required',
			'color',
			'defaultValue',
			'subLabelClassName',
		]

		const selectProps = restrictProps(this.props, ourProps, defaultProps)
		const defaultOptions = []

		selectProps.className = this.props.className ? classNames(this.props.className, css.dropdown) : css.dropdown

		return (
			<div className={css.container}>
				<span className={css.mobileOnly}>
					{this.renderNative(this.props.options || defaultOptions)}
				</span>
				<span className={css.mobileHide}>
					{this.renderSelect(this.props.options || defaultOptions, selectProps)}
				</span>
			</div>
		)
	}

}

export default InputWrapper(DropdownInput)
