import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'goustouicomponents'
import Link from 'Link'

import css from './BottomButton.css'

const BottomButton = ({ color, clientRouted, url, children }) => (
  <Button
    areChildrenInSegment
    color={color}
    className={css.button}
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

BottomButton.defaultProps = {
  disabled: false
}

BottomButton.propTypes = {
  children: PropTypes.node.isRequired,
  clientRouted: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export {
  BottomButton
}
