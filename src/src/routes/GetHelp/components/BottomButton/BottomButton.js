import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'goustouicomponents'
import Link from 'Link'

import css from './BottomButton.css'

const BottomButton = ({ color, disabled, clientRouted, url, children }) => (
  <Button
    areChildrenInSegment
    color={color}
    disabled={disabled}
    className={css.button}
    width="auto"
  >
    {!disabled ?
      <Link
        noDecoration
        disabled={disabled}
        className={css.buttonChild}
        clientRouted={clientRouted}
        to={url}
      >
        {children}
      </Link> : children }
  </Button>
)

BottomButton.defaultProps = {
  disabled: false
}

BottomButton.propTypes = {
  children: PropTypes.node.isRequired,
  clientRouted: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  url: PropTypes.string.isRequired,
}

export {
  BottomButton
}
