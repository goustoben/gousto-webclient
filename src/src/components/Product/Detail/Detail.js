import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import OverlayHeader from 'Overlay/Header'
import Image from 'Image'
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
    <div className={css.container} onClick={(e) => { e.stopPropagation() }}>
      <OverlayHeader title={title} onClose={() => { onVisibilityChange(false) }} />

      <div className={css.content}>
        <div className={css.row}>
          <div className={css.colMD}>
            <Image media={media} title={title} className={css.image} />
          </div>

          <div className={css.colSM}>
            <div className={css.detailContainer}>
              {buttonProps.onAdd || buttonProps.onRemove ?
                <span className={css.detailButtons}>
                  <Buttons {...buttonProps} qty={qty} />
                </span> : null
              }

              <p>{description}</p>

              <p>{formatPrice(listPrice)}</p>
            </div>
          </div>

          {!!attributes.size &&
            <div className={css.colFull}>
              <Attributes attributes={attributes} />
            </div>
          }
        </div>
      </div>
    </div>
  </div>
)

Detail.propTypes = propTypes
export default Detail
