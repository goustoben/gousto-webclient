import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { Button, Segment } from 'goustouicomponents'
import css from './BrowseCTAButton.css'

const handleSetDeliveryDateClick = (menuBrowseCTAVisibilityChange, boxDetailsVisibilityChange, boxSummaryShow, view) => {
  if (!boxSummaryShow) {
    menuBrowseCTAVisibilityChange(false)
    boxDetailsVisibilityChange(true, view)
  } else {
    boxDetailsVisibilityChange(false, '')
  }
}

const BrowseCTAButton = ({ menuBrowseCTAVisibilityChange, boxDetailsVisibilityChange, boxSummaryShow, view, disable, fullWidth }) => {
  const classes = classnames(
    css[`setDeliveryDateButton-${view}`],
    { [css.fullWidth]: view === 'mobile' && fullWidth },
  )

  return (
		<Button className={classes} data-testing="menuBrowseCTAButton">
			<Segment
			  onClick={() => {
			    if (!disable) {
			      handleSetDeliveryDateClick(menuBrowseCTAVisibilityChange, boxDetailsVisibilityChange, boxSummaryShow, view)
			    }
			  }}
			  className={css[view]}
			>
				{view === 'mobile' ? 'Set Date' : 'Set Delivery Date'}
			</Segment>
		</Button>
  )
}

BrowseCTAButton.propTypes = {
  boxDetailsVisibilityChange: PropTypes.func.isRequired,
  menuBrowseCTAShow: PropTypes.bool,
  menuBrowseCTAVisibilityChange: PropTypes.func,
  boxSummaryShow: PropTypes.bool,
  disable: PropTypes.bool.isRequired,
  view: PropTypes.string,
  fullWidth: PropTypes.bool,
}

export default BrowseCTAButton
