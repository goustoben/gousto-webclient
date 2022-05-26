import React from 'react'

import { Button, Segment } from 'goustouicomponents'
import PropTypes from 'prop-types'

import css from './BoxPriceButton.css'

export const BoxPriceButton = ({ numPersons, boxPricesBoxSizeSelected, children }) => {
  const handleClick = () => {
    boxPricesBoxSizeSelected(numPersons)
  }

  return (
    <Button>
      <Segment className={css.segment} onClick={handleClick}>
        {children}
      </Segment>
    </Button>
  )
}

BoxPriceButton.propTypes = {
  numPersons: PropTypes.number.isRequired,
  boxPricesBoxSizeSelected: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
