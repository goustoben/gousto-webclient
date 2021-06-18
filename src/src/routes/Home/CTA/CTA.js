import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { CTA as CTAButton } from 'goustouicomponents'
import css from './CTA.css'

const CTA = ({
  isHomepageFreeDeliveryEnabled,
  homeGetStarted,
  ctaUri,
  sectionForTracking,
  children,
  dataTesting,
}) => {
  const handleClick = () => {
    homeGetStarted(ctaUri, sectionForTracking)
  }

  return (
    <div
      className={classNames(css.ctaContainer, {
        [css.isHomepageFreeDeliveryEnabled]: isHomepageFreeDeliveryEnabled,
      })}
    >
      <CTAButton testingSelector={dataTesting} onClick={handleClick} isFullWidth>
        {children}
      </CTAButton>
    </div>
  )
}

CTA.propTypes = {
  isHomepageFreeDeliveryEnabled: PropTypes.bool,
  homeGetStarted: PropTypes.func.isRequired,
  ctaUri: PropTypes.string.isRequired,
  sectionForTracking: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
  ]).isRequired,
  dataTesting: PropTypes.string,
}

CTA.defaultProps = {
  isHomepageFreeDeliveryEnabled: false,
  sectionForTracking: null,
  dataTesting: '',
}

export { CTA }
