import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import { formatPrice } from 'utils/format'

import css from './Price.css'

const Price = ({ pricing, isPending }) => {
  if (isPending) {
    return <span className={css.primaryPrice}>£&mdash;</span>
  }

  const grossTotal = parseFloat(pricing?.grossTotal || '0')
  const totalDiscount = parseFloat(pricing?.totalDiscount || '0')
  const total = parseFloat(pricing?.total || '0')

  const isDiscountEnabled = totalDiscount > 0

  return isDiscountEnabled ? (
    <>
      <span className={css.strikedOutPrice}>{formatPrice(grossTotal)}</span>
      <span className={css.primaryPrice}>{formatPrice(total)}</span>
    </>
  ) : (
    <span className={css.primaryPrice}>{formatPrice(grossTotal)}</span>
  )
}

export { Price }
