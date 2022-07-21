import React, { useCallback } from 'react'

import classnames from 'classnames'
import { Button, Segment } from 'goustouicomponents'
import PropTypes from 'prop-types'

import { useBasket } from 'routes/Menu/domains/basket'
import { isMobile } from 'utils/view'

import css from './BrowseCTAButton.css'

const handleSetDeliveryDateClick = (
  menuBrowseCTAVisibilityChange,
  boxDetailsVisibilityChange,
  boxSummaryShow,
  removeRecipe,
) => {
  if (!boxSummaryShow) {
    menuBrowseCTAVisibilityChange(false)
    boxDetailsVisibilityChange(true, removeRecipe)
  } else {
    boxDetailsVisibilityChange(false, removeRecipe)
  }
}

const BrowseCTAButton = ({
  menuBrowseCTAVisibilityChange,
  boxDetailsVisibilityChange,
  boxSummaryShow,
  view,
  disable,
  fullWidth,
}) => {
  const isMobileView = isMobile(view)
  const classes = classnames(css[`setDeliveryDateButton-${view}`], {
    [css.fullWidth]: isMobileView && fullWidth,
  })

  const { removeRecipe } = useBasket()

  const onClick = useCallback(() => {
    if (!disable) {
      handleSetDeliveryDateClick(
        menuBrowseCTAVisibilityChange,
        boxDetailsVisibilityChange,
        boxSummaryShow,
        removeRecipe,
      )
    }
  }, [
    boxDetailsVisibilityChange,
    boxSummaryShow,
    disable,
    menuBrowseCTAVisibilityChange,
    removeRecipe,
  ])

  return (
    <Button className={classes} data-testing="menuBrowseCTAButton">
      <Segment onClick={onClick} className={css[view]}>
        {isMobileView ? 'Set Date' : 'Set Delivery Date'}
      </Segment>
    </Button>
  )
}

BrowseCTAButton.propTypes = {
  boxDetailsVisibilityChange: PropTypes.func.isRequired,
  menuBrowseCTAVisibilityChange: PropTypes.func,
  boxSummaryShow: PropTypes.bool,
  disable: PropTypes.bool.isRequired,
  view: PropTypes.string,
  fullWidth: PropTypes.bool,
}

BrowseCTAButton.defaultProps = {
  menuBrowseCTAVisibilityChange: () => {},
  boxSummaryShow: true,
  view: null,
  fullWidth: false,
}

export { BrowseCTAButton }
