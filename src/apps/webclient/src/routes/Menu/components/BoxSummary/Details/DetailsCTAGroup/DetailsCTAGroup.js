import React from 'react'
import { CheckoutButton } from 'routes/Checkout/Components/CheckoutButton'
import { boxSummaryViews, getCurrentBoxSummaryView } from 'utils/boxSummary'
import PropTypes from 'prop-types'
import config from 'config'
import { getOkRecipeIds } from 'routes/Menu/selectors/basket'
import { basketSum } from 'utils/basket'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutBasket } from 'routes/Menu/actions/menuCheckoutClick'
import { usePricing } from 'routes/Menu/domains/pricing'
import css from './DetailsCTAGroup.css'

const DetailsCTAGroup = ({ boxDetailsVisibilityChange, isBasketRequiredFeatureEnabled }) => {
  const okRecipeIds = useSelector(getOkRecipeIds)
  const numRecipes = basketSum(okRecipeIds)
  const boxSummaryCurrentView = useSelector(getCurrentBoxSummaryView)
  const dispatch = useDispatch()
  const { pricing } = usePricing()
  const onCheckout = () => dispatch(checkoutBasket({ pricing }))
  const onChooseMore = () => boxDetailsVisibilityChange(false)

  if (boxSummaryCurrentView !== boxSummaryViews.DETAILS || !isBasketRequiredFeatureEnabled) {
    return null
  }

  if (numRecipes < config.basket.minRecipesNum) {
    return (
      <div className={css.detailsCTAGroup}>
        <CheckoutButton variant="primary" onClick={onChooseMore} isFullWidth>
          Choose recipes
        </CheckoutButton>
      </div>
    )
  }

  if (numRecipes === config.basket.maxRecipesNum) {
    return (
      <div className={css.detailsCTAGroup}>
        <CheckoutButton variant="primary" onClick={onCheckout} isFullWidth>
          Checkout
        </CheckoutButton>
        <CheckoutButton variant="secondary" onClick={onChooseMore} isFullWidth>
          Back to menu
        </CheckoutButton>
      </div>
    )
  }

  return (
    <div className={css.detailsCTAGroup}>
      <CheckoutButton variant="primary" onClick={onCheckout} isFullWidth>
        Checkout
      </CheckoutButton>
      <CheckoutButton variant="secondary" onClick={onChooseMore} isFullWidth>
        Choose more recipes
      </CheckoutButton>
    </div>
  )
}

DetailsCTAGroup.propTypes = {
  boxDetailsVisibilityChange: PropTypes.func.isRequired,
  isBasketRequiredFeatureEnabled: PropTypes.bool.isRequired,
}

export { DetailsCTAGroup }
