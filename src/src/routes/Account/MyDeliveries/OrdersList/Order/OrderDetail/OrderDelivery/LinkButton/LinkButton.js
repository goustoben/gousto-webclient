import React from 'react'
import PropTypes from 'prop-types'
import css from './LinkButton.module.css'

const propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

const LinkButton = ({ text, onClick }) => (
  <button onClick={onClick} type="button" className={css.link}>
    {text}
  </button>
)

LinkButton.propTypes = propTypes

export { LinkButton }
