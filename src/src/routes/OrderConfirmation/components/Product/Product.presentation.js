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
  ageVerificationPending: PropTypes.bool,
  inProgress: PropTypes.bool,
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
  ageVerificationPending,
  inProgress,
}) => (
    <div className={css.productDetails}>
      <button
        type="button"
        className={classnames(css.resetButtonStyle, css.productImage)}
        onClick={() => openDetailsScreen()}
      >
        <img src={imgSource} alt={title} />
      </button>
      {lowStock && <span className={css.productLowStock}>low stock</span>}
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
          <div
            className={css.productButtonWrapper}
            role="button"
            aria-label="Add or Remove Product"
          >
            <Buttons
              ageVerificationPending={ageVerificationPending}
              fullWidth
              inProgress={inProgress}
              isAgeVerificationRequired={isAgeVerificationRequired}
              isAvailable={!limitReached}
              limitReached={limitReached}
              onAdd={onAdd}
              onRemove={onRemove}
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
