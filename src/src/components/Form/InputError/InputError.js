import PropTypes from 'prop-types'
import React from 'react'
import formsCss from 'styles/forms.css'

const InputError = ({ children }) => (
	<p className={formsCss.errorMsg}>{children}</p>
)

InputError.propTypes = {
  children: PropTypes.node.isRequired,
}

export default InputError
