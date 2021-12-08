import React from 'react'
import PropTypes from 'prop-types'
import css from './ScrollCarousel.module.css'

export const ScrollCarouselBody = ({ children }) => (
  <div className={css.scrollable}>{children}</div>
)

ScrollCarouselBody.propTypes = {
  children: PropTypes.node.isRequired,
}

export const ScrollCarousel = ({ children }) => <div>{children}</div>

ScrollCarousel.propTypes = {
  children: PropTypes.node.isRequired,
}
