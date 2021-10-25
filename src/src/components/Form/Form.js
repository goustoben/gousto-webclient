import PropTypes from 'prop-types'
import React from 'react'
import css from './Form.css'

const Form = ({ children, ...props }) => (
  <form { ...props }>
    {children}
    <input type="submit" name="submit" value="submit" className={css.hideSubmit} />
  </form>
)

Form.propTypes = {
  children: PropTypes.node.isRequired,
}

Form.defaultProps = {
  method: 'post',
}

export default Form
