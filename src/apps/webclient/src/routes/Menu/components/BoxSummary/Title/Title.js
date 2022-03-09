import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
import basketConfig from 'config/basket'
import { usePricing } from 'routes/Menu/domains/pricing'
import { Spinner } from 'goustouicomponents'
import { isMobile } from 'utils/view'
import { useDiscountTip } from 'routes/Menu/components/BoxSummary/utilHooks'
import { useSelector } from 'react-redux'
import { getIsSimplifyBasketBarEnabled } from 'selectors/features'
import { Price } from '../Price'
import css from './Title.css'

const minRecipesToCheckout = basketConfig.minRecipesNum
const propTypes = {
  date: PropTypes.string,
  view: PropTypes.string,
  spinnerClassName: PropTypes.string,
  spinnerContainerClassName: PropTypes.string,
  slotTime: PropTypes.string,
  numRecipes: PropTypes.number,
}

const deliveryTip = <b>Free UK delivery,</b>
const defaultProps = {
  date: '',
  view: '',
  spinnerClassName: '',
  spinnerContainerClassName: '',
  slotTime: '',
  numRecipes: 0,
}

export function Title({ slotTime, date, view, spinnerClassName, spinnerContainerClassName, numRecipes }) {
  const { pricing, isPending } = usePricing()
  const spinnerClassNames = {
    [css.spinnerContainer]: true,
    spinnerContainerClassName,
    [css.spinnerShow]: isPending,
  }
  const discountTip = useDiscountTip()
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)
  const titleContent =
    numRecipes < minRecipesToCheckout ? (
      <div className={css.discountTip}>{discountTip || deliveryTip}</div>
    ) : (
      <Price
        recipeTotal={parseFloat(pricing?.grossTotal || 0)}
        recipeDiscount={parseFloat(pricing?.totalDiscount || 0)}
        recipeTotalDiscounted={parseFloat(pricing?.total || 0)}
      />
    )

  return isSimplifyBasketBarEnabled ? (
    <div className={classNames(css.titleWrapperVariant)}>{titleContent}</div>
  ) : (
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

Title.defaultProps = defaultProps
Title.propTypes = propTypes
