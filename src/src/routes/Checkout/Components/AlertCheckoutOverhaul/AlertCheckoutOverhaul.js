import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import css from './AlertCheckoutOverhaul.css'

export const AlertCheckoutOverhaul = ({ children }) => (
  <div className={css.alert}>
    <div className={css.iconContainer}>
      <Svg className={css.icon} fileName="icon-danger" />
    </div>
    <div className={css.content}>{children}</div>
  </div>
)

AlertCheckoutOverhaul.propTypes = {
  children: PropTypes.node.isRequired,
}
