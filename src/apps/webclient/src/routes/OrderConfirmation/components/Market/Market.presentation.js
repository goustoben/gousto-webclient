import React from 'react'

import classnames from 'classnames'
import { Alert } from 'goustouicomponents'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { SaveButton } from 'components/OrderSummary/SaveButton'
import Overlay from 'components/Overlay'
import CloseButton from 'components/Overlay/CloseButton'
import config from 'config/products'

import { OCCASIONS_CATEGORY_NAME, PAIRINGS_CATEGORY_NAME } from '../../constants/categories'
import { LoadingWrapper } from '../LoadingWrapper'
import { OrderSummaryContainer } from '../OrderSummary/OrderSummaryContainer'
import { ProductList } from '../ProductList'
import { ProductListBundles } from '../ProductListBundles'
import { ProductListPairings } from '../ProductListPairings'
import { ProductsNavBar } from '../ProductsNavBar'
import { ReferAFriend } from '../ReferAFriend'

import css from './Market.css'

const filteredProductPropType = PropTypes.objectOf(
  PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    listPrice: PropTypes.string,
    images: PropTypes.instanceOf(Immutable.Map),
    ageRestricted: PropTypes.bool,
    quantity: PropTypes.number,
  }),
)

const productPropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    listPrice: PropTypes.string,
    isVatable: PropTypes.bool,
    isForSale: PropTypes.bool,
    ageRestricted: PropTypes.bool,
    boxLimit: PropTypes.number,
    alwaysOnMenu: PropTypes.bool,
    volume: PropTypes.number,
    zone: PropTypes.string,
    createdAt: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        boxLimit: PropTypes.number,
        isDefault: PropTypes.bool,
        recentlyAdded: PropTypes.bool,
        hidden: PropTypes.bool,
        pivot: PropTypes.shape({
          createdAt: PropTypes.string,
        }),
      }),
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.objectOf(
      PropTypes.shape({
        src: PropTypes.string,
        url: PropTypes.string,
        width: PropTypes.number,
      }),
    ),
  }),
)

const propTypes = {
  ageVerified: PropTypes.bool,
  basket: PropTypes.instanceOf(Immutable.Map).isRequired,
  bundlesProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      bundleName: PropTypes.string,
      bundleDescription: PropTypes.string,
      bundleImage: PropTypes.string,
      bundlePrice: PropTypes.string,
      bundlesProducts: PropTypes.arrayOf(productPropType),
    }),
  ),
  categoriesForNavBar: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      count: PropTypes.number,
    }),
  ).isRequired,
  filteredProducts: PropTypes.oneOfType([productPropType, filteredProductPropType]),
  getFilteredProducts: PropTypes.func.isRequired,
  isOrderSummaryOpen: PropTypes.bool,
  onOrderSave: PropTypes.func.isRequired,
  products: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      listPrice: PropTypes.string,
      images: PropTypes.objectOf(
        PropTypes.shape({
          src: PropTypes.string,
          url: PropTypes.string,
          width: PropTypes.number,
        }),
      ),
      ageRestricted: PropTypes.bool,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  productsCategories: PropTypes.instanceOf(Immutable.Map).isRequired,
  productsLoadError: PropTypes.bool,
  saveError: PropTypes.bool,
  saveRequired: PropTypes.bool,
  saving: PropTypes.bool,
  showOrderConfirmationReceipt: PropTypes.bool.isRequired,
  toggleAgeVerificationPopUp: PropTypes.func.isRequired,
  toggleOrderSummary: PropTypes.func.isRequired,
  productRecipePairings: PropTypes.instanceOf(Immutable.List),
  isLoading: PropTypes.bool,
  trackingCategory: PropTypes.string,
}

const defaultProps = {
  ageVerified: false,
  bundlesProducts: null,
  filteredProducts: null,
  isOrderSummaryOpen: false,
  productsLoadError: false,
  saveError: false,
  saveRequired: false,
  saving: false,
  productRecipePairings: Immutable.Map({}),
  isLoading: false,
  trackingCategory: '',
}

const MarketPresentation = ({
  ageVerified,
  basket,
  bundlesProducts,
  categoriesForNavBar,
  filteredProducts,
  getFilteredProducts,
  isOrderSummaryOpen,
  onOrderSave,
  products,
  productsCategories,
  productsLoadError,
  saveError,
  saveRequired,
  saving,
  showOrderConfirmationReceipt,
  toggleAgeVerificationPopUp,
  toggleOrderSummary,
  productRecipePairings,
  isLoading,
  trackingCategory,
}) => {
  const showPairings = !isLoading && trackingCategory === PAIRINGS_CATEGORY_NAME
  const showOccasions = !isLoading && trackingCategory === OCCASIONS_CATEGORY_NAME
  const showDefault =
    !isLoading &&
    trackingCategory !== PAIRINGS_CATEGORY_NAME &&
    trackingCategory !== OCCASIONS_CATEGORY_NAME

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
          {showPairings && (
            <ProductListPairings
              productRecipePairings={productRecipePairings}
              products={filteredProducts || products}
              basket={basket}
              ageVerified={ageVerified}
              productsCategories={productsCategories}
              toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
              trackingCategory={trackingCategory}
            />
          )}
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

MarketPresentation.propTypes = propTypes
MarketPresentation.defaultProps = defaultProps

export { MarketPresentation }
