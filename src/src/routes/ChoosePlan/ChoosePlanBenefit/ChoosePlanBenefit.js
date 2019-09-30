import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'goustouicomponents'
import css from './ChoosePlanBenefit.css'

const propTypes = {
  benefits: PropTypes.arrayOf(PropTypes.string),
}

const ChoosePlanBenefit = ({ benefits }) => (
  <div>
    <ul className={css.list}>
      {benefits.map((benefit) => (
        <li key={benefit}>
            <span className={css.bullet}><i className={css.tick} /></span> <p>{benefit}</p>
        </li>
      ))}
    </ul>
  </div>
)

ChoosePlanBenefit.propTypes = propTypes

export { ChoosePlanBenefit }
