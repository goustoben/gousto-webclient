import PropTypes from 'prop-types'
import React from 'react'
import { Button, Segment } from 'goustouicomponents'
import Link from 'Link'
import css from './LinkButton.css'

export const LinkButton = ({ children, clientRouted, color, disabled, fill, to, width }) => (
  <Button fill={fill}>
    <Segment
      className={css.segment}
      color={color}
      disabled={disabled}
      fill={fill}
      width={width}
      onClick={() => {}}
    >
      <Link to={to} noDecoration clientRouted={clientRouted}>
        {children}
      </Link>
    </Segment>
  </Button>
)

LinkButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['primary']),
  fill: PropTypes.bool,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.oneOf(['auto', 'full']),
  clientRouted: PropTypes.bool,
}

LinkButton.defaultProps = {
  children: null,
  color: 'primary',
  fill: true,
  to: '#',
  disabled: false,
  width: 'auto',
  clientRouted: true,
}
