import PropTypes from 'prop-types'
import React, { createElement } from 'react'
import classNames from 'classnames'
import typography from 'design-language/typography.css'
import css from './ModuleHeader.css'

const ModuleHeader = ({ children, size, isHomePageRedesignEnabled }) => {
  const type = size === 'big' ? 'h2' : 'h3'
  const styles = size === 'big' && isHomePageRedesignEnabled ? typography.fontStyleXL : css[size]
  const headerElement = createElement(type, { className: `${css.header} ${styles}` }, children)

  return (
    <div className={classNames(css.container, { [css.homepageRedesign]: isHomePageRedesignEnabled })}>
      {headerElement}
    </div>
  )
}

ModuleHeader.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(['big', 'small']),
  isHomePageRedesignEnabled: PropTypes.bool,
}

ModuleHeader.defaultProps = {
  size: 'big',
  isHomePageRedesignEnabled: false
}

export { ModuleHeader }
