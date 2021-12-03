import React from 'react'
import css from './PriceExplanationSection.module.css'

export const message = 'Please note that additional charges may apply for our premium recipes.'

export const PriceExplanationSection = () => (
  <div className={css.priceExplanationSection}>{message}</div>
)
