import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Svg from 'Svg'
import css from './SocialButton.css'

const SocialButton = ({ text, type, onClick, elementType }) => {
  const buttonType = `button-${type}`
  const iconType = `icon-${type}`
  const isComponent = elementType === 'component'

  const socialButtonClasses = classnames(
    css[buttonType],
    { [css.componentSocialButton]: isComponent })

  const svgClasses = classnames(
    css.icon,
    { [css.componentSvg]: isComponent })

  const spanClasses = classnames(
    css.text,
    { [css.componentText]: isComponent })

  return (
    <div className={socialButtonClasses} onClick={onClick}>
      <Svg fileName={iconType} className={svgClasses} />
      <span className={spanClasses}>{text}</span>
    </div>
  )
}

const propTypes = {
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
  elementType: PropTypes.string,
  onClick: PropTypes.func,
}

const defaultProps = {
  text: '',
  elementType: 'page',
  onClick: () => { }
}

SocialButton.propTypes = propTypes
SocialButton.defaultProps = defaultProps

export { SocialButton }
