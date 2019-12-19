import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Image from 'Image'
import CloseButton from 'Overlay/CloseButton'
import { ModalTitle, ModalContent } from 'ModalComponent'
import Attributes from 'Product/Attributes'
import Buttons from 'Product/Buttons'
import { formatPrice } from 'utils/format'
import css from './Detail.css'

const propTypes = {
  isOpened: PropTypes.bool,
  isAgeVerificationRequired: PropTypes.bool.isRequired,
  attributes: PropTypes.instanceOf(Immutable.List),
  description: PropTypes.string.isRequired,
  inProgress: PropTypes.bool,
  isAvailable: PropTypes.bool.isRequired,
  limitReached: PropTypes.oneOfType([
    PropTypes.shape({
      type: PropTypes.string,
      value: PropTypes.number,
    }),
    PropTypes.bool,
  ]).isRequired,
  listPrice: PropTypes.string.isRequired,
  media: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.List),
    PropTypes.string,
  ]).isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onVerifyAge: PropTypes.func,
  onVisibilityChange: PropTypes.func,
  outOfStock: PropTypes.bool.isRequired,
  productId: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

const Detail = ({
  attributes,
  description,
  listPrice,
  media,
  onVisibilityChange,
  title,
  qty,
  outOfStock,
  ...buttonProps
}) => (
  <div className={css.fullHeight} onClick={() => { onVisibilityChange() }}>
    <div className={css.container} onClick={(e) => { e.stopPropagation() }}>
      <ModalTitle className={css.productDetailsTitle}>
        {title}
        <CloseButton onClose={() => onVisibilityChange()} />
      </ModalTitle>
      <ModalContent className={css.productDetailsContent}>
        <div className={css.productDetailsContentRow}>
          <div className={css.productDetailsImage}>
            <Image media={media} title={title} className={css.image} />
          </div>
          <div className={css.detailContainer}>
            <p className={css.productDetailsDescription}>{description}</p>

            <div>
              <span className={css.productDetailsPrice}>{formatPrice(listPrice)}</span>
              {buttonProps.onAdd || buttonProps.onRemove ?
                <div className={css.detailButtons}>
                  <Buttons {...buttonProps} qty={qty} outOfStock={outOfStock} />
                </div> : null
              }
            </div>

          </div>
        </div>

        {!!attributes.size &&
          <div className={css.productDetailsAttributes}>
            <Attributes attributes={attributes} />
          </div>
        }
      </ModalContent>
    </div>
  </div>
)

Detail.propTypes = propTypes
export default Detail
