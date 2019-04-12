import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { Button, Segment } from 'goustouicomponents'
import css from './CTA.css'

const CTA = ({ onClick, children, withContainer, align, responsive, dataTesting }) => (
  <div className={classnames(withContainer ? css.buttonContainer : css.buttonSimple, responsive ? css.buttonResponsive : '', css[align])}>
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
}

CTA.defaultProps = {
  withContainer: true,
  align: 'center',
  responsive: false,
}

export default CTA
