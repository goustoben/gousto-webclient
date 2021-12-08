import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import classnames from 'classnames'
import { onEnter } from '../../utils/accessibility'
import { Heading } from '../Heading'
import css from './Item.module.css'

const propTypes = {
  arrowClass: PropTypes.string.isRequired,
  href: PropTypes.string,
  iconPath: PropTypes.string,
  isLabelHeading: PropTypes.bool,
  itemClasses: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  subText: PropTypes.string,
}

const defaultProps = {
  href: null,
  iconPath: null,
  isLabelHeading: false,
  onClick: () => { },
  subText: null,
}

const renderText = (label, subText, extraClasses = []) => (
  <span className={classnames(css.textWrapper, ...extraClasses)}>
    {label}
    {subText && <span className={css.subText}>{subText}</span>}
  </span>
)

const renderContent = (arrowClass, iconPath, isLabelHeading, label, subText) => (
  <Fragment>
    {iconPath && (
      <span className={css.icon}>
        <img src={iconPath} alt="" />
      </span>
    )}
    {
      isLabelHeading ? (
        <Heading size="fontStyleM" hasMargin={false}>
          {renderText(label, subText, [css.heading])}
        </Heading>
      ) : renderText(label, subText)
    }
    <span className={arrowClass} />
  </Fragment>
)

const ItemPresentation = ({
  arrowClass, href, iconPath, isLabelHeading, itemClasses, label, onClick, subText,
}) => {
  const attributes = {
    className: itemClasses,
    onClick,
    onKeyDown: onEnter(onClick),
    role: 'button',
    tabIndex: 0,
    href,
  }

  return React.createElement(
    href ? 'a' : 'div',
    attributes,
    renderContent(arrowClass, iconPath, isLabelHeading, label, subText),
  )
}

ItemPresentation.propTypes = propTypes
ItemPresentation.defaultProps = defaultProps

export {
  ItemPresentation,
}
