import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import moment from 'moment'

import { Spinner } from 'goustouicomponents'
import { isMobile } from 'utils/view'
import { Price } from '../Price'
import css from './Title.module.css'

const propTypes = {
  date: PropTypes.string,
  view: PropTypes.string,
  spinnerClassName: PropTypes.string,
  spinnerContainerClassName: PropTypes.string,
  pending: PropTypes.bool,
  recipeTotal: PropTypes.number,
  recipeDiscount: PropTypes.number,
  recipeTotalDiscounted: PropTypes.number,
  slotTime: PropTypes.string,
}

const defaultProps = {
  date: '',
  view: '',
  spinnerClassName: '',
  spinnerContainerClassName: '',
  slotTime: '',
  pending: false,
  recipeTotal: 0,
  recipeDiscount: 0,
  recipeTotalDiscounted: 0,
}

class Title extends React.PureComponent {
  render() {
    const { recipeTotal, recipeDiscount, recipeTotalDiscounted, slotTime, date, view, pending, spinnerClassName, spinnerContainerClassName } = this.props
    const spinnerClassNames = {
      [css.spinnerContainer]: true,
      spinnerContainerClassName,
      [css.spinnerShow]: pending,
    }

    return (
      <div className={css.titleWrapper}>
        <p className={css[`title${view}`]}>
          {date ? <span className={css.showDate}>{moment(date).format('ddd D MMM')}</span> : null}
          {slotTime ? (
            <span className={css.showDate}>
              {' '}
              {slotTime}
            </span>
          ) : null}
        </p>
        <div className={classNames(css[`title${view}`], css.price)}>
          {
            pending ? isMobile(view) && (
              <div className={classNames(spinnerClassNames)}>
                <span className={classNames(css.spinner, spinnerClassName)}>
                  <Spinner />
                </span>
              </div>
            ) : (
              <Price
                recipeTotal={recipeTotal}
                recipeDiscount={recipeDiscount}
                recipeTotalDiscounted={recipeTotalDiscounted}
              />
            )
          }
        </div>
      </div>
    )
  }
}

Title.propTypes = propTypes
Title.defaultProps = defaultProps

export { Title }
