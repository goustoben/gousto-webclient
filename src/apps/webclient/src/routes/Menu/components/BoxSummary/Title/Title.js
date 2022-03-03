import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import moment from 'moment'

import { usePricing } from 'routes/Menu/domains/pricing'
import { Spinner } from 'goustouicomponents'
import { isMobile } from 'utils/view'
import { Price } from '../Price'
import css from './Title.css'

const propTypes = {
  date: PropTypes.string,
  view: PropTypes.string,
  spinnerClassName: PropTypes.string,
  spinnerContainerClassName: PropTypes.string,
  slotTime: PropTypes.string,
}

const defaultProps = {
  date: '',
  view: '',
  spinnerClassName: '',
  spinnerContainerClassName: '',
  slotTime: '',
}

function Title({ slotTime, date, view, spinnerClassName, spinnerContainerClassName }) {
  const { pricing, isPending } = usePricing()
  const spinnerClassNames = {
    [css.spinnerContainer]: true,
    spinnerContainerClassName,
    [css.spinnerShow]: isPending,
  }

  return (
    <div className={css.titleWrapper}>
      <p className={css[`title${view}`]}>
        {date ? <span className={css.showDate}>{moment(date).format('ddd D MMM')}</span> : null}
        {slotTime ? <span className={css.showDate}> {slotTime}</span> : null}
      </p>
      <div className={classNames(css[`title${view}`], css.price)}>
        {isPending ? (
          isMobile(view) && (
            <div className={classNames(spinnerClassNames)}>
              <span className={classNames(css.spinner, spinnerClassName)}>
                <Spinner />
              </span>
            </div>
          )
        ) : (
          <Price
            recipeTotal={parseFloat(pricing?.grossTotal || 0)}
            recipeDiscount={parseFloat(pricing?.totalDiscount || 0)}
            recipeTotalDiscounted={parseFloat(pricing?.total || 0)}
          />
        )}
      </div>
    </div>
  )
}

Title.propTypes = propTypes
Title.defaultProps = defaultProps

export { Title }
