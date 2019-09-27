import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import css from './PlanOption.css'

const propTypes = {
  title: PropTypes.string,
  selected: PropTypes.bool,
  handleSelect: PropTypes.func,
  totalPrice: PropTypes.string,
  totalPriceDiscounted: PropTypes.string,
  pricePerPortion: PropTypes.string,
  priceBoxTypeMessage: PropTypes.string
}

const PlanOption = ({
  title,
  selected,
  handleSelect,
  totalPrice,
  totalPriceDiscounted,
  pricePerPortion,
  priceBoxTypeMessage
}) => {
  return (
    <label
      htmlFor={title}
      className={classnames(css.container, {
        [css.containerSelected]: selected
      })}
      tabIndex="0"
    >
      <div className={css.radioContainer}>
        <input
          type="radio"
          id={title}
          checked={selected}
          className={css.hiddenRadio}
          onClick={handleSelect}
          tabIndex="-1"
        />
        <div
          className={classnames(css.customRadio, {
            [css.customRadioSelected]: selected
          })}
        />
        <h3 className={css.title}>{title}</h3>
      </div>
      <p>All the bullet points and other details down here</p>
      <p>All the bullet points and other details down here</p>
      <p>All the bullet points and other details down here</p>
      <p>All the bullet points and other details down here</p>
      {!totalPriceDiscounted ? (
        <span className={css.totalPrice}>£{totalPrice}</span>
      ) : (
        <span className={css.totalPriceDiscounted}>
          <s className={css.totalPrice}>£{totalPrice}</s>£{totalPriceDiscounted}
        </span>
      )}
      <span className={css.exclExtras}>excl. extras</span>
      <p className={css.priceMessage}>{priceBoxTypeMessage}</p>
      <p className={css.priceMessage}>{`(£${pricePerPortion} per meal per person)`}</p>
    </label>
  )
}

PlanOption.propTypes = propTypes

export { PlanOption }
