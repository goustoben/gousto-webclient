import React from 'react'
import classnames from 'classnames'
import css from './AlternativeOptionItem.css'

type ItemContentProps = {
  recipeName: string
  isOnDetailScreen: boolean
  isOutOfStock: boolean
  surcharge: number | null
  isFromShowcaseMenu?: boolean
}

export const ItemContent = ({
  recipeName,
  isOutOfStock,
  isOnDetailScreen,
  surcharge = null,
  isFromShowcaseMenu = false,
}: ItemContentProps) => (
  <div className={css.labelContainer}>
    <div className={css.titleContainer}>
      <span className={css.titleText}>{recipeName}</span>
    </div>
    {surcharge && !isOutOfStock && !isFromShowcaseMenu && (
      <div className={classnames(css.extraInformation, { [css.negativeMargin]: isOnDetailScreen })}>
        <span className={css.surchargeAmountText}>{`+£${surcharge.toFixed(2)}`}</span>
        <span className={css.perServingText}>per serving</span>
      </div>
    )}
    {isOutOfStock && <span className={css.soldOutText}>Sold out</span>}
  </div>
)
