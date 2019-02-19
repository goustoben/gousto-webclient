import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import InputWrapper from 'Form/InputWrapper'
import css from './CheckBox.css'

export class CheckBox extends React.PureComponent {
	static propTypes = {
	  additionalProps: PropTypes.object,
	  onChange: PropTypes.func,
	  className: PropTypes.string,
	  labelClassName: PropTypes.string,
	  disabled: PropTypes.bool,
	  required: PropTypes.bool,
	  checked: PropTypes.bool,
	  label: PropTypes.string.isRequired,
	  name: PropTypes.string,
	  'data-testing': PropTypes.string,
	  style: PropTypes.oneOf([
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
