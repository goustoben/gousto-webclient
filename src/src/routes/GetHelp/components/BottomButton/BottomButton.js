import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'goustouicomponents'
import Link from 'Link'

import css from './BottomButton.css'

const BottomButton = ({
  children,
  clientRouted,
  color,
  onClick,
  url,
  fullWidth,
}) => (
  <Button
    areChildrenInSegment
    color={color}
    className={fullWidth ? css.buttonFullWidth : css.button}
    onClick={onClick}
  >
    <Link
      noDecoration
      className={css.buttonChild}
      clientRouted={clientRouted}
      to={url}
    >
      {children}
    </Link>
  </Button>
)

BottomButton.propTypes = {
  children: PropTypes.node.isRequired,
  clientRouted: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  url: PropTypes.string.isRequired,
}

BottomButton.defaultProps = {
  onClick: null,
  fullWidth: false,
}

export {
  BottomButton
}
