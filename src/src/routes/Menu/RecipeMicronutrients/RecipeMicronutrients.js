import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import css from './RecipeMicronutrients.css'

const RecipeMicronutrients = ({ micronutrients, inset }) => {
  return !!micronutrients && (
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
          {micronutrients.map((micronutrient) => {
            return (
              <tr className={css.tableBorder}>
                <td className={css.tablePadding}>{micronutrient.get('name')}</td>
                <td className={css.tablePadding}>{micronutrient.get('nrvPercent')}</td>
                <td className={css.tablePadding}>{micronutrient.getIn(['content', 'amount'])} {micronutrient.getIn(['content', 'unit'])}</td>
              </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  )
}

RecipeMicronutrients.propTypes = {
  inset: PropTypes.bool,
  micronutrients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    nrv: PropTypes.number,
    content: PropTypes.shape({
      amount: PropTypes.number,
      unit: PropTypes.string
    })
  }))
}

RecipeMicronutrients.defaultProps = {
  inset: true
}

export { RecipeMicronutrients }
