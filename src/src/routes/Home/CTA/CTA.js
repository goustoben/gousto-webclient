import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { Button, Segment, CTA as CTAButton } from 'goustouicomponents'
import css from './CTA.css'

const CTA = ({
  homeGetStarted,
  ctaUri,
  sectionForTracking,
  children,
  withContainer,
  align,
  responsive,
  dataTesting,
  isHomePageRedesignEnabled
}) => {
  const handleClick = () => {
    homeGetStarted(ctaUri, sectionForTracking)
  }

  if (isHomePageRedesignEnabled) {
    return (
      <div className={css.redesignCTAContainer}>
        <CTAButton
          testingSelector={dataTesting}
          onClick={handleClick}
          isFullWidth
        >
          {children}
        </CTAButton>
      </div>
    )
  }

  return (
    <div
      className={classNames(css[align], {
        [css.buttonContainer]: withContainer,
        [css.buttonSimple]: !withContainer,
        [css.buttonResponsive]: responsive
      })}
    >
      <Button width="full" data-testing={dataTesting}>
        <Segment
          onClick={handleClick}
          className={classNames({
            [css.segmentResponsive]: responsive,
            [css.segment]: !responsive
          })}
        >
          {children}
        </Segment>
      </Button>
    </div>
  )
}

CTA.propTypes = {
  homeGetStarted: PropTypes.func.isRequired,
  ctaUri: PropTypes.string.isRequired,
  sectionForTracking: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element
  ]).isRequired,
  withContainer: PropTypes.bool,
  align: PropTypes.string,
  responsive: PropTypes.bool,
  dataTesting: PropTypes.string,
  isHomePageRedesignEnabled: PropTypes.bool
}

CTA.defaultProps = {
  sectionForTracking: null,
  withContainer: true,
  align: 'center',
  responsive: false,
  isHomePageRedesignEnabled: false
}

export { CTA }
