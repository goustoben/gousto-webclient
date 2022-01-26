import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { CTA } from 'goustouicomponents'

import details from './images/ordersummary1.png'
import extra from './images/ordersummary3.png'

const imagesStyles = {
  width: '100%',
  height: 'auto',
}

const buttonWrapperStyles = {
  padding: '0 3.8%',
  background: 'white',
}

export const OrderSummary = ({ onStepChange }) => (
  <Fragment>
    <img src={details} alt="header" style={imagesStyles} />
    <div style={buttonWrapperStyles}>
      <CTA onClick={onStepChange} isFullWidth>
        Proceed to Checkout
      </CTA>
    </div>
    <img src={extra} alt="header" style={imagesStyles} />
  </Fragment>
)

OrderSummary.propTypes = {
  onStepChange: PropTypes.func.isRequired,
}
