import React from 'react'
import PropTypes from 'prop-types'
import Buttons from 'Product/Buttons'
import css from './Product.css'

const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  listPrice: PropTypes.string,
  imgSource: PropTypes.string,
  ageVerificationRequired: PropTypes.bool,
  limitReached: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  qty: PropTypes.number,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
}

const ProductPresentation = ({
  id,
  qty,
  title,
  onAdd,
  onRemove,
  listPrice,
  imgSource,
  limitReached,
  ageVerificationRequired,
}) => (
  <div className={css.productWrapper}>
    <div className={css.productCard}>
      <div className={css.productImage}>
        <img src={imgSource} alt={title} />
      </div>
      <div className={css.productDetailsContainer}>
        <div className={css.productDetailsList}>
          <div className={css.productTitle}>{title}</div>
          <p className={css.productPrice}>£{listPrice}</p>
        </div>
        <div className={css.productAddButton} role="button" aria-label="Add or Remove Product">
          <Buttons
            productId={id}
            ageVerificationRequired={ageVerificationRequired}
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
  </div>
)

ProductPresentation.propTypes = propTypes

export { ProductPresentation } 
