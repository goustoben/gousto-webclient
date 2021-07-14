import PropTypes from 'prop-types'
import React from 'react'
import css from './OrderCollapseExpand.css'

const OrderCollapseExpand = ({ collapsed, onClick }) => (
  <div className={css.arrowBox}>
    <i
      role="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onKeyPress={onClick}
      tabIndex={0}
      className={collapsed ? css.arrowDown : css.arrowUp}
    />
  </div>
)

OrderCollapseExpand.propTypes = {
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
}

OrderCollapseExpand.defaultProps = {
  collapsed: true,
  onClick: () => {},
}

export default OrderCollapseExpand
