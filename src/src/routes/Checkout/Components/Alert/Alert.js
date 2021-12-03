import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import css from './Alert.module.css'

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
