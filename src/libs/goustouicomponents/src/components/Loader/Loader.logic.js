import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './Loader.module.css'

const propTypes = {
  color: PropTypes.oneOf(['Bluecheese', 'White']),
}

const defaultProps = {
  color: 'White',
}

const Loader = ({ color }) => <div className={classnames(css.loader, css[`color${color}`])}><span className={css.middleBox} /></div>

Loader.propTypes = propTypes
Loader.defaultProps = defaultProps

export { Loader }
