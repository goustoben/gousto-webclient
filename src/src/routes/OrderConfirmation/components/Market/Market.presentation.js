import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Immutable from 'immutable'

import { Alert } from 'goustouicomponents'
import config from 'config/products'
import Overlay from 'Overlay'
import CloseButton from 'Overlay/CloseButton'
import SaveButton from 'OrderSummary/SaveButton'
import { ProductsNavBar } from '../ProductsNavBar'
import OrderSummaryContainer from '../OrderSummary/OrderSummaryContainer'
import { ProductList } from '../ProductList'
import { ReferAFriend } from '../ReferAFriend'

import css from './Market.css'

const propTypes = {
  ageVerified: PropTypes.bool,
  basket: PropTypes.instanceOf(Immutable.Map).isRequired,
  categoriesForNavBar: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  filteredProducts: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      listPrice: PropTypes.string,
      images: PropTypes.array,
      ageRestricted: PropTypes.bool,
      quantity: PropTypes.number,
    })
  ),
  getFilteredProducts: PropTypes.func.isRequired,
  isOrderSummaryOpen: PropTypes.bool,
  onOrderSave: PropTypes.func.isRequired,
  products: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      listPrice: PropTypes.string,
      images: PropTypes.array,
      ageRestricted: PropTypes.bool,
      quantity: PropTypes.number,
    })
  ).isRequired,
  productsCategories: PropTypes.instanceOf(Immutable.Map).isRequired,
  productsLoadError: PropTypes.string,
  saveError: PropTypes.bool,
  saveRequired: PropTypes.bool,
  saving: PropTypes.bool,
  selectedCategory: PropTypes.string.isRequired,
  showOrderConfirmationReceipt: PropTypes.bool.isRequired,
  toggleAgeVerificationPopUp: PropTypes.func.isRequired,
  toggleOrderSummary: PropTypes.func.isRequired,
}

const defaultProps = {
  ageVerified: false,
  filteredProducts: null,
  isOrderSummaryOpen: false,
  saveError: false,
  saveRequired: false,
  saving: false,
}

const MarketPresentation = ({
  ageVerified,
  basket,
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
  selectedCategory,
  showOrderConfirmationReceipt,
  toggleAgeVerificationPopUp,
  toggleOrderSummary,
}) => (
  <div className={css.marketPlaceWrapper}>
    {!productsLoadError && (
      <ProductsNavBar
        categories={categoriesForNavBar}
        onSelectCategory={getFilteredProducts}
      />
    )}
    <div className={css.marketPlaceContent}>
      <section
        className={classnames(
          css.marketPlaceProducts,
          { [css.productsLoadError]: productsLoadError }
        )}
      >
        {productsLoadError ?
          <Alert type="warning">{config.productsLoadErrorMessage}</Alert>
          :
          (
            <ProductList
              products={filteredProducts || products}
              basket={basket}
              ageVerified={ageVerified}
              productsCategories={productsCategories}
              toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
              selectedCategory={selectedCategory}
            />
          )
        }
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
      <section
        className={classnames(css.orderDetailsMobile, css.mobileShow)}
      >
        <button
          className={css.orderDetailsOpenButton}
          type='button'
          onClick={toggleOrderSummary}
        >
          Open Order Summary
        </button>
        <Overlay open={isOrderSummaryOpen} from='bottom'>
          <div className={css.orderDetailsMobileContent}>
          <div className={css.orderDetailsCloseButton}>
            <CloseButton onClose={toggleOrderSummary} />
          </div>
            <OrderSummaryContainer
              orderSummaryCollapsed={false}
              onOrderConfirmationMobile
            />
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

MarketPresentation.propTypes = propTypes
MarketPresentation.defaultProps = defaultProps

export { MarketPresentation }
