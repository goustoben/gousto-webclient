import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { Button, Segment } from 'goustouicomponents'
import typography from 'design-language/typography.css'
import css from './CTA.css'

const CTA = ({ onClick, children, withContainer, align, responsive, dataTesting, isHomePageRedesignEnabled }) => (
  <div className={classnames(css[align], {
    [css.buttonContainer]: withContainer,
    [css.buttonSimple]: !withContainer,
    [css.buttonResponsive]: responsive,
    [typography.fontStyleBodyL]: isHomePageRedesignEnabled,
    [css.homepageRedesign]: isHomePageRedesignEnabled })}
  >
    <Button width="full" data-testing={dataTesting}>
      <Segment onClick={onClick} className={responsive ? css.segmentResponsive : css.segment}>{children}</Segment>
    </Button>
  </div>
)

CTA.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
  ]).isRequired,
  withContainer: PropTypes.bool,
  align: PropTypes.string,
  responsive: PropTypes.bool,
  dataTesting: PropTypes.string,
  isHomePageRedesignEnabled: PropTypes.bool,
}

CTA.defaultProps = {
  withContainer: true,
  align: 'center',
  responsive: false,
  isHomePageRedesignEnabled: false,
}

export { CTA }
