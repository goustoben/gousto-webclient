import React from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'

import Buttons from 'components/Product/Buttons'

import css from './Product.css'

const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  listPrice: PropTypes.string.isRequired,
  imgSource: PropTypes.string.isRequired,
  lowStock: PropTypes.bool.isRequired,
  outOfStock: PropTypes.bool.isRequired,
  isAgeVerificationRequired: PropTypes.bool.isRequired,
  limitReached: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.number,
    }),
    PropTypes.bool,
  ]).isRequired,
  qty: PropTypes.number.isRequired,
  ageVerificationPending: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  openDetailsScreen: PropTypes.func.isRequired,
}

const ProductPresentation = ({
  id,
  qty,
  title,
  lowStock,
  outOfStock,
  onAdd,
  onRemove,
  listPrice,
  imgSource,
  limitReached,
  isAgeVerificationRequired,
  openDetailsScreen,
  ageVerificationPending,
  inProgress,
}) => (
  <div className={css.productDetails}>
    <button
      type="button"
      className={classnames(css.resetButtonStyle, css.productImage)}
      onClick={() => openDetailsScreen()}
    >
      <img className={classnames({ [css.fadedImage]: outOfStock })} src={imgSource} alt={title} />
    </button>
    {lowStock && !outOfStock && <span className={css.productLowStock}>low stock</span>}
    <div className={css.productContent}>
      <div className={css.productContentFirstColumn}>
        <button
          type="button"
          className={classnames(css.resetButtonStyle, css.productInfo)}
          onClick={() => openDetailsScreen()}
        >
          <h3 className={css.productTitle}>{title}</h3>
        </button>
      </div>
      <div>
        <p className={css.productPrice}>£{listPrice}</p>
        <div className={css.productButtonWrapper} role="button" aria-label="Add or Remove Product">
          <Buttons
            ageVerificationPending={ageVerificationPending}
            fullWidth
            inProgress={inProgress}
            isAgeVerificationRequired={isAgeVerificationRequired}
            isAvailable={!limitReached}
            limitReached={limitReached}
            onAdd={onAdd}
            onRemove={onRemove}
            outOfStock={outOfStock}
            productId={id}
            qty={qty}
            showPopUp
          />
        </div>
      </div>
    </div>
  </div>
)

ProductPresentation.propTypes = propTypes

export { ProductPresentation }
