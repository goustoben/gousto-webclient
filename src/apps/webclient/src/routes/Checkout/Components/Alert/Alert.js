import React from 'react'

import Svg from 'Svg'
import PropTypes from 'prop-types'

import css from './Alert.css'

export const Alert = ({ children }) => (
  <div className={css.alert}>
    <div className={css.iconContainer}>
      <Svg className={css.icon} fileName="icon-danger" />
    </div>
    <div className={css.content}>{children}</div>
  </div>
)

Alert.propTypes = {
  children: PropTypes.node.isRequired,
}
