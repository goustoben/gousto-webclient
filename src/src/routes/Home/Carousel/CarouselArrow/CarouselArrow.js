import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import css from './CarouselArrow.css'

export const Arrow = ({ side, ...props }) => {
  const stripInvalidHtmlProps = (allProps) => {
    const carouselPropKeys = ['currentSlide', 'slideCount']

    return Object.entries(allProps).reduce(
      (_htmlProps, [key, val]) => ({
        ..._htmlProps,
        ...(!carouselPropKeys.includes(key) && { [key]: val }),
      }),
      {}
    )
  }

  const htmlProps = stripInvalidHtmlProps(props)

  return (
    <button
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...htmlProps}
      type="button"
      tabIndex="0"
      className={classNames(css.arrow, css[side])}
    />
  )
}

Arrow.propTypes = {
  side: PropTypes.string.isRequired,
}
