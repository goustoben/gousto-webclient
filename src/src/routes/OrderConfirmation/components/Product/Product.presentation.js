import React from 'react'
import PropTypes from 'prop-types'
import Buttons from 'Product/Buttons'
import classnames from 'classnames'
import css from './Product.css'

const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  listPrice: PropTypes.string,
  imgSource: PropTypes.string,
  lowStock: PropTypes.bool,
  isAgeVerificationRequired: PropTypes.bool,
  limitReached: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.number,
    }),
    PropTypes.bool,
  ]),
  qty: PropTypes.number,
  pending: PropTypes.bool,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  openDetailsScreen: PropTypes.func,
}

const ProductPresentation = ({
  id,
  qty,
  title,
  lowStock,
  onAdd,
  onRemove,
  listPrice,
  imgSource,
  limitReached,
  isAgeVerificationRequired,
  openDetailsScreen,
  pending
}) => (
    <div className={css.productDetails}>
      <button type="button" className={classnames(css.resetButtonStyle, css.productImage)} onClick={() => openDetailsScreen()}>
        <img src={imgSource} alt={title} />
      </button>
      {lowStock && <span className={css.productLowStock}>low stock</span>}
      <div className={css.productContent}>
        <div>
          <button type="button" className={classnames(css.resetButtonStyle, css.productInfo)} onClick={() => openDetailsScreen()}>
            <h3 className={css.productTitle}>{title}</h3>
            <span className={css.productPrice}>£{listPrice}</span>
          </button>
        </div>
        <div className={css.productButtonWrapper} role="button" aria-label="Add or Remove Product">
          <Buttons
            productId={id}
            pending={pending}
            isAgeVerificationRequired={isAgeVerificationRequired}
            onAdd={onAdd}
            onRemove={onRemove}
            qty={qty}
            limitReached={limitReached}
            isAvailable={!limitReached}
            showPopUp
          />
        </div>
      </div>
    </div>
)

ProductPresentation.propTypes = propTypes

export { ProductPresentation }
