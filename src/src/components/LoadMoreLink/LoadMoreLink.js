import PropTypes from 'prop-types'
import React from 'react'
import { Div, Span } from 'Page/Elements'
import Icon from 'Icon'
import Link from 'Link'

const LoadMoreButton = ({ children, onClick, ...restProps }) => (
  <Div text-center {...restProps}>
    <Link
      onClick={onClick}
    >
      <Span
        textLinkLG
        textBold
      >
        <Div style={{ lineHeight: 1 }}>
          {children}
        </Div>
        <Icon name="fa-angle-down" />
      </Span>
    </Link>
  </Div>
)

LoadMoreButton.defaultProps = {
  children: 'See more',
}

LoadMoreButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
}

export default LoadMoreButton
