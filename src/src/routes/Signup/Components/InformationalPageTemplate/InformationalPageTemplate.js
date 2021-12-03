import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './InformationalPageTemplate.module.css'

export const InformationalPageTemplate = ({
  isGoustoOnDemandEnabled,
  testingSelector,
  headerText,
  children,
}) => (
  <div className={css.container} data-testing={testingSelector}>
    <div className={classNames(css.partition, css.mobileAndTabletOnly)}>
      <div
        className={classNames(
          css.image,
          isGoustoOnDemandEnabled ? css.topImageGoustoOnDemand : css.topImage
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
        <h1 className={css.heading}>{headerText}</h1>
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
}

InformationalPageTemplate.defaultProps = {
  isGoustoOnDemandEnabled: false,
  testingSelector: null,
}
