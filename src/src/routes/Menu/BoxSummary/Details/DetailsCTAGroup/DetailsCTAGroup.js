import React from 'react'
import { CheckoutButton } from 'routes/Checkout/Components/CheckoutButton'
import { boxSummaryViews , getCurrentBoxSummaryView } from 'utils/boxSummary'
import PropTypes from 'prop-types'
import { getOkRecipeIds } from 'routes/Menu/selectors/basket'
import { basketSum } from 'utils/basket'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutBasket } from 'routes/Menu/actions/menuCheckoutClick'
import css from './DetailsCTAGroup.css'

const DetailsCTAGroup = ({boxDetailsVisibilityChange, isBasketRequiredFeatureEnabled}) => {
  const okRecipeIds = useSelector(getOkRecipeIds)
  const numRecipes = basketSum(okRecipeIds)
  const boxSummaryCurrentView = useSelector(getCurrentBoxSummaryView)
  const dispatch = useDispatch()

  const onCheckout = () => dispatch(checkoutBasket())
  const onChooseMore = () => boxDetailsVisibilityChange(false)

  if (boxSummaryCurrentView !== boxSummaryViews.DETAILS || !isBasketRequiredFeatureEnabled) {
    return null
  }

  switch (numRecipes) {
  case 0:
  case 1:
    return (
      <div className={css.detailsCTAGroup}>
        <CheckoutButton variant="primary" onClick={onChooseMore} isFullWidth>
          Choose recipes
        </CheckoutButton>
      </div>
    )
  case 2:
  case 3:
    return (
      <div className={css.detailsCTAGroup}>
        <React.Fragment>
          <CheckoutButton variant="primary" onClick={onCheckout} isFullWidth>
            Checkout
          </CheckoutButton>
          <CheckoutButton variant="secondary" onClick={onChooseMore} isFullWidth>
            Choose more recipes
          </CheckoutButton>
        </React.Fragment>
      </div>
    )
  case 4:
  default:
    return (
      <div className={css.detailsCTAGroup}>
        <React.Fragment>
          <CheckoutButton variant="primary" onClick={onCheckout} isFullWidth>
            Checkout
          </CheckoutButton>
          <CheckoutButton variant="secondary" onClick={onChooseMore} isFullWidth>
            Back to menu
          </CheckoutButton>
        </React.Fragment>
      </div>
    )
  }
}

DetailsCTAGroup.propTypes = {
  boxDetailsVisibilityChange: PropTypes.func.isRequired,
  isBasketRequiredFeatureEnabled: PropTypes.bool.isRequired
}

export { DetailsCTAGroup }
