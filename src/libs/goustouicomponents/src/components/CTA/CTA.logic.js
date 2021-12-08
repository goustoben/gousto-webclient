import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Loader } from '../Loader'
import css from './CTA.module.css'

const renderContent = (children) => <span className={css.content}>{children}</span>

const CTA = ({
  children,
  extraInfo,
  isDarkTheme,
  isDisabled,
  isFullWidth,
  isLoading,
  onClick,
  size,
  testingSelector,
  variant,
}) => {
  const classes = classnames(
    css.cta,
    css[size],
    {
      [css[variant]]: variant !== 'primary',
      [css.isDarkTheme]: isDarkTheme,
      [css.isDisabled]: isDisabled,
      [css.isFullWidth]: isFullWidth === true,
      [css.isFullWidthForSmallScreens]: isFullWidth === 'small-screens-only',
      [css.isLoading]: isLoading,
    },
  )

  const loaderColour = (variant === 'primary') ? 'White' : 'Bluecheese'

  return (
    <button
      className={classes}
      data-testing={testingSelector}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      type="button"
    >
      {
        extraInfo
          ? (
            <span className={css.contentWrap}>
              {renderContent(children, isLoading)}
              <span className={css.extraInfo}>{extraInfo}</span>
            </span>
          ) : renderContent(children, isLoading)
      }
      {
        isLoading
        && (
          <span className={css.loaderWrap}>
            <Loader color={loaderColour} />
          </span>
        )
      }
    </button>
  )
}

CTA.propTypes = {
  children: PropTypes.node.isRequired,
  extraInfo: PropTypes.string,
  isDarkTheme: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isFullWidth: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['small-screens-only']),
  ]),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  testingSelector: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary']),
}

CTA.defaultProps = {
  extraInfo: null,
  isDarkTheme: false,
  isDisabled: false,
  isFullWidth: false,
  isLoading: false,
  size: 'medium',
  testingSelector: null,
  variant: 'primary',
}

export { CTA }
