import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import Image from 'Image'
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
      value: PropTypes.string,
      type: PropTypes.string,
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
  ...buttonProps
}) => (
  <div className={css.fullHeight} onClick={() => { onVisibilityChange(false) }}>
    <div className={css.container}>
      <ModalTitle className={css.productDetailsTitle}>{title}</ModalTitle>
      <ModalContent className={css.productDetailsContent}>
        <div className={css.productDetailsContentRow}>
          <div className={css.image}>
           <Image media={media} title={title} />
          </div>
          <div className={css.detailContainer}>
            <p className={css.productDetailsDescription}>{description}</p>
              
            <div>
              <p className={css.productDetailsPrice}>{formatPrice(listPrice)}</p>
              {buttonProps.onAdd || buttonProps.onRemove ?
                  <div className={css.detailButtons}>
                    <Buttons {...buttonProps} qty={qty} />
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
