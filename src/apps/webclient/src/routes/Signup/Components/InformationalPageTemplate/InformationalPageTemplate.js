import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './InformationalPageTemplate.css'

export const InformationalPageTemplate = ({
  isGoustoOnDemandEnabled,
  testingSelector,
  headerText,
  headerSize,
  children,
}) => (
  <div className={css.container} data-testing={testingSelector}>
    <div className={classNames(css.partition, css.mobileAndTabletOnly)}>
      <div
        className={classNames(
          css.image,
          isGoustoOnDemandEnabled ? css.topImageGoustoOnDemand : css.topImage,
        )}
        role="img"
        aria-label="Sample dishes offered by Gousto"
      />
    </div>
    <div className={classNames(css.partition, css.desktopOnly)}>
      <div
        className={classNames(css.image, css.desktopImage)}
        role="img"
        aria-label="Sample dishes offered by Gousto"
      />
    </div>
    <div className={css.partition}>
      <div className={css.content}>
        <h1 className={classNames(css.heading, {
          [css.fontStyle2XL]: headerSize === 'fontStyle2XL',
          [css.fontStyle3XL]: headerSize === 'fontStyle3XL',
        })}>{headerText}</h1>
        {children}
      </div>
    </div>
    <div className={classNames(css.partition, css.tabletOnly)}>
      <div
        className={classNames(css.image, css.bottomImage)}
        role="img"
        aria-label="More sample dishes offered by Gousto"
      />
    </div>
  </div>
)

InformationalPageTemplate.propTypes = {
  isGoustoOnDemandEnabled: PropTypes.bool,
  testingSelector: PropTypes.string,
  children: PropTypes.node.isRequired,
  headerText: PropTypes.string.isRequired,
  headerSize: PropTypes.oneOf(['fontStyle2XL', 'fontStyle3XL',]),
}

InformationalPageTemplate.defaultProps = {
  isGoustoOnDemandEnabled: false,
  testingSelector: null,
  headerSize: 'fontStyle3XL',
}
