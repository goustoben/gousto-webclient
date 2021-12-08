import React from 'react'
import PropTypes from 'prop-types'
import css from './ExtraInfoMain.module.css'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const ExtraInfoMain = ({ children }) => <div className={css.mainWrapper}>{children}</div>

ExtraInfoMain.propTypes = propTypes

export {
  ExtraInfoMain,
}
