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
}) => (
  <Button
    areChildrenInSegment
    color={color}
    className={css.button}
    onClick={onClick}
    width="auto"
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
  url: PropTypes.string.isRequired,
}

BottomButton.defaultProps = {
  onClick: null,
}

export {
  BottomButton
}
