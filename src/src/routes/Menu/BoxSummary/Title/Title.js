import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import moment from 'moment'

import { Spinner } from 'goustouicomponents'
import { isMobile } from 'utils/view'
import Price from '../Price'
import css from './Title.css'

class Title extends React.PureComponent {
  static propTypes = {
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
  static defaultProps = {
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

  render() {
    const { recipeTotal, recipeDiscount, recipeTotalDiscounted, slotTime } = this.props
    const date = this.props.date
    const view = this.props.view
    const pending = this.props.pending
    const spinnerClassNames = {
      [css.spinnerContainer]: true,
      [this.props.spinnerContainerClassName]: true,
      [css.spinnerShow]: pending,
    }

    return (
      <div className={css.titleWrapper}>
        <p className={css[`title${view}`]}>
          {date ? <span className={css.showDate}>{moment(date).format('ddd D MMM')}</span> : null}
          {slotTime ? <span className={css.showDate}> {slotTime}</span> : null}
        </p>
        <div className={classNames(css[`title${view}`], css.price)}>
          {
            pending ? isMobile(view) && (
              <div className={classNames(spinnerClassNames)}>
                <span className={classNames(css.spinner, this.props.spinnerClassName)}>
                  <Spinner />
                </span>
              </div>
            ) : <Price
              recipeTotal={recipeTotal}
              recipeDiscount={recipeDiscount}
              recipeTotalDiscounted={recipeTotalDiscounted}
            />
          }
        </div>
      </div>
    )
  }

}
export default Title
