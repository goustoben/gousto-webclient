import React, { Fragment } from 'react'
import Immutable from 'immutable'
import { PricePerServingMessage } from 'components/PricePerServingMessage'
import Receipt from 'Receipt'
import Loading from 'Loading'
import { getSurchargeItems } from 'utils/pricing'
import { basketSum } from 'utils/basket'
import { usePricing } from 'routes/Menu/domains/pricing'
import { SectionHeader } from '../SectionHeader'
import { PromoCode } from '../PromoCode'
import css from './Summary.css'

type Props = {
  isLoading: boolean
  showPromoCode: boolean
  /* eslint-disable react/require-default-props */
  basketRecipes?: Immutable.Map<string, any>
  isGoustoOnDemandEnabled?: boolean
}

const Summary = ({
  isLoading,
  showPromoCode,
  basketRecipes = Immutable.Map({}),
  isGoustoOnDemandEnabled = false,
}: Props) => {
  const numRecipes = basketSum(basketRecipes)
  const { pricing } = usePricing()

  const {
    deliveryTotal,
    items,
    surchargeTotal,
    recipeTotal,
    recipeDiscount,
    percentageOff,
    productTotal,
    total,
    pricePerPortion,
    pricePerPortionDiscounted,
  } = pricing || {}

  return (
    <div className={css.summaryContainerRedesign} data-testing="checkoutOrderSummary">
      <SectionHeader title="Order total" />
      {isLoading ? (
        <div className={css.loaderContainer}>
          <Loading className={css.loadingImage} />
        </div>
      ) : (
        <Fragment>
          <div className={css.pricePerServingBlock}>
            <div className={css.discountIcon} />
            <PricePerServingMessage
              isPriceInCheckout
              fullPrice={pricePerPortion || null}
              discountedPrice={pricePerPortionDiscounted || null}
            />
          </div>
          <div className={css.details}>
            <Receipt
              numRecipes={numRecipes}
              prices={pricing}
              deliveryTotalPrice={deliveryTotal}
              surcharges={getSurchargeItems(items)}
              surchargeTotal={surchargeTotal}
              recipeTotalPrice={recipeTotal}
              totalToPay={total || ''}
              recipeDiscountAmount={recipeDiscount}
              recipeDiscountPercent={percentageOff}
              extrasTotalPrice={productTotal}
              isReceiptInCheckout
              isGoustoOnDemandEnabled={isGoustoOnDemandEnabled}
            />
            {showPromoCode && <PromoCode />}
          </div>
        </Fragment>
      )}
    </div>
  )
}

export { Summary }
