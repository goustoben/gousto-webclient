import PropTypes from 'prop-types'
import React from 'react'
import css from './OrderCollapseExpand.css'

const OrderCollapseExpand = ({
  collapsed,
}) => (
  <div className={css.arrowBox}>
    <i className={collapsed ? css.arrowDown : css.arrowUp} aria-hidden="true"></i>
  </div>
)

OrderCollapseExpand.propTypes = {
  collapsed: PropTypes.bool,
}

OrderCollapseExpand.defaultProps = {
  collapsed: true,
}

export default OrderCollapseExpand
