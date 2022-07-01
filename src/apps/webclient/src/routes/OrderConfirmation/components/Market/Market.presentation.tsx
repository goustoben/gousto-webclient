import React from 'react'

import classnames from 'classnames'
import { Alert } from 'goustouicomponents'

import { SaveButton } from 'components/OrderSummary/SaveButton'
import Overlay from 'components/Overlay'
import CloseButton from 'components/Overlay/CloseButton'
import config from 'config/products'

import { OCCASIONS_CATEGORY_NAME } from '../../constants/categories'
import type { Basket } from '../../types/basket'
import type { Bundle } from '../../types/bundles'
import type { NavigationCategories } from '../../types/navigationCategory'
import type { ProductCategories } from '../../types/productCategory'
import type { Products } from '../../types/products'
import { LoadingWrapper } from '../LoadingWrapper'
import { OrderSummaryContainer } from '../OrderSummary/OrderSummaryContainer'
import { ProductList } from '../ProductList'
import { ProductListBundles } from '../ProductListBundles'
import { ProductsNavBar } from '../ProductsNavBar'
import { ReferAFriend } from '../ReferAFriend'

import css from './Market.css'

type Props = {
  ageVerified: boolean
  basket: Basket
  bundlesProducts: Bundle[] | null
  categoriesForNavBar: NavigationCategories
  filteredProducts: Products | null
  getFilteredProducts: (arg: string) => void
  isOrderSummaryOpen: boolean
  onOrderSave: () => void
  products: Products
  productsCategories: ProductCategories
  productsLoadError: boolean
  saveError: boolean
  saveRequired: boolean
  saving: boolean
  showOrderConfirmationReceipt: boolean
  toggleAgeVerificationPopUp: () => void
  toggleOrderSummary: () => void
  isLoading: boolean
  trackingCategory: string
}

const MarketPresentation = ({
  ageVerified = false,
  basket,
  bundlesProducts = null,
  categoriesForNavBar,
  filteredProducts = null,
  getFilteredProducts,
  isOrderSummaryOpen = false,
  onOrderSave,
  products,
  productsCategories,
  productsLoadError,
  saveError = false,
  saveRequired = false,
  saving = false,
  showOrderConfirmationReceipt,
  toggleAgeVerificationPopUp,
  toggleOrderSummary,
  isLoading = false,
  trackingCategory = '',
}: Props) => {
  const showOccasions = !isLoading && trackingCategory === OCCASIONS_CATEGORY_NAME
  const showDefault = !isLoading && trackingCategory !== OCCASIONS_CATEGORY_NAME

  return (
    <div className={css.marketPlaceWrapper} data-testid="MarketPresentation">
      {!productsLoadError && (
        <ProductsNavBar categories={categoriesForNavBar} onSelectCategory={getFilteredProducts} />
      )}
      <div className={css.marketPlaceContent}>
        <section
          className={classnames(css.marketPlaceProducts, {
            [css.productsLoadError]: productsLoadError,
          })}
        >
          {productsLoadError && <Alert type="warning">{config.productsLoadErrorMessage}</Alert>}
          {isLoading && <LoadingWrapper />}
          {showOccasions && (
            <ProductListBundles
              getFilteredProducts={getFilteredProducts}
              products={bundlesProducts}
            />
          )}
          {showDefault && (
            <ProductList
              products={filteredProducts || products}
              basket={basket}
              ageVerified={ageVerified}
              productsCategories={productsCategories}
              toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
              trackingCategory={trackingCategory}
            />
          )}
        </section>
        {showOrderConfirmationReceipt && (
          <section className={classnames(css.orderDetails, css.mobileHide)}>
            <div className={css.orderDetailsSection}>
              <OrderSummaryContainer onOrderConfirmationMobile />
            </div>
            <div className={css.orderDetailsSection}>
              <ReferAFriend />
            </div>
          </section>
        )}
        <section className={classnames(css.orderDetailsMobile, css.mobileShow)}>
          <button className={css.orderDetailsOpenButton} type="button" onClick={toggleOrderSummary}>
            Open Order Summary
          </button>
          <Overlay open={isOrderSummaryOpen} from="bottom">
            <div className={css.orderDetailsMobileContent}>
              <div className={css.orderDetailsCloseButton}>
                <CloseButton onClose={toggleOrderSummary} />
              </div>
              <OrderSummaryContainer orderSummaryCollapsed={false} onOrderConfirmationMobile />
            </div>
          </Overlay>
          <SaveButton
            onOrderConfirmationMobile
            saving={saving}
            saveRequired={saveRequired}
            onClick={onOrderSave}
            error={saveError}
          />
        </section>
      </div>
    </div>
  )
}

export { MarketPresentation }
