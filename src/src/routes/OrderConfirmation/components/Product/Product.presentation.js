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
  isAgeVerificationRequired: PropTypes.bool,
  limitReached: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.string,
      type: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
  qty: PropTypes.number,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  openDetailsScreen:PropTypes.func,
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
  isAgeVerificationRequired,
  openDetailsScreen,
}) => (
  <div className={css.productDetails}>
    <button type="button" className={classnames(css.resetButtonStyle, css.productImage)} onClick={() => openDetailsScreen()}>
      <img src={imgSource} alt={title}/>
    </button>
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
