import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'List/List.js'
import css from './ChoosePlanBenefit.css'

const propTypes = {
  benefits: PropTypes.arrayOf(PropTypes.string),
}

const ChoosePlanBenefit = ({ benefits }) => (
  <div>
    <List className={css.green} listItems={benefits} />
  </div>
)

ChoosePlanBenefit.propTypes = propTypes

export { ChoosePlanBenefit }
