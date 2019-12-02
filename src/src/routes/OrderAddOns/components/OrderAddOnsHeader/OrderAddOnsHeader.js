import React from 'react'
import PropTypes from 'prop-types'
import { Heading } from 'goustouicomponents'
import css from './OrderAddOnsHeader.css'

const propTypes = {
  numberOfProducts: PropTypes.number.isRequired,
  onClickSkip: PropTypes.func.isRequired,
}

function OrderAddOnsHeader({
  numberOfProducts,
  onClickSkip,
}) {
  return (
    <div className={css.headerWrapper}>
      <div className={css.headerTop}>
        <Heading type='h1' size='large'>You may also like</Heading>
        <button
          type='button'
          className={css.skipButton}
          onClick={onClickSkip}
        >
          Skip
        </button>
      </div>
      <Heading type='h2'>{`(${numberOfProducts} products)`}</Heading>
    </div>
  )
}

OrderAddOnsHeader.propTypes = propTypes

export { OrderAddOnsHeader }
