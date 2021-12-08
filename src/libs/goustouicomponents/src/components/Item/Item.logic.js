import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { ItemPresentation } from './Item.presentation'
import css from './Item.module.css'

const propTypes = {
  canExpand: PropTypes.bool,
  href: PropTypes.string,
  iconPath: PropTypes.node,
  isExpanded: PropTypes.bool,
  isHiddenOnMobile: PropTypes.bool,
  isLabelHeading: PropTypes.bool,
  isLinkStyled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  subText: PropTypes.string,
  trackClick: PropTypes.func,
}

const defaultProps = {
  canExpand: false,
  href: null,
  iconPath: null,
  isExpanded: false,
  isHiddenOnMobile: false,
  isLabelHeading: false,
  isLinkStyled: true,
  onClick: () => {},
  subText: null,
  trackClick: () => {},
}

const Item = ({
  canExpand,
  href,
  iconPath,
  isExpanded,
  isHiddenOnMobile,
  isLabelHeading,
  isLinkStyled,
  onClick,
  label,
  subText,
  trackClick,
}) => {
  const onClickHandler = () => {
    trackClick()
    onClick()
  }

  const itemClasses = classnames(
    css.item,
    {
      [css.hiddenOnMobile]: isHiddenOnMobile,
      [css.linkStyle]: isLinkStyled,
    },
  )

  const arrowClass = () => {
    if (!canExpand) {
      return css.itemArrowRight
    }

    return isExpanded ? css.itemArrowUp : css.itemArrowDown
  }

  return (
    <ItemPresentation
      arrowClass={arrowClass()}
      href={href}
      iconPath={iconPath}
      itemClasses={itemClasses}
      isLabelHeading={isLabelHeading}
      label={label}
      onClick={onClickHandler}
      subText={subText}
    />
  )
}

Item.propTypes = propTypes
Item.defaultProps = defaultProps

export {
  Item,
}
