import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'

import css from './RecipeMicronutrients.module.css'

const RecipeMicronutrients = ({ micronutrients, inset }) => !!micronutrients && (
<div className={css.micronutrientsWrapper}>
  <table className={classnames(css.table, inset && css.tableMargins)}>
    <thead>
      <tr className={css.tableBorder}>
        <th className={css.tablePadding}>Micronutrients</th>
        <th className={css.tablePadding}>% NRV</th>
        <th className={css.tablePadding}>per portion</th>
      </tr>
    </thead>
    <tbody>
      {micronutrients.map((micronutrient) => (
        <tr className={css.tableBorder} key={micronutrient.get('name')}>
          <td className={css.tablePadding}>{micronutrient.get('name')}</td>
          <td className={css.tablePadding}>{micronutrient.get('nrvPercent')}</td>
          <td className={css.tablePadding}>
            {micronutrient.getIn(['content', 'amount'])}
            {' '}
            {micronutrient.getIn(['content', 'unit'])}
          </td>
        </tr>
      ))}

    </tbody>
  </table>
</div>
)

RecipeMicronutrients.propTypes = {
  inset: PropTypes.bool,
  micronutrients: PropTypes.instanceOf(Immutable.List)
}

RecipeMicronutrients.defaultProps = {
  inset: true
}

export { RecipeMicronutrients }
