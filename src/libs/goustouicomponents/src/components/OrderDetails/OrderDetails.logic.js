import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { OrderState } from '../OrderState'
import { RecipesImagery } from '../RecipesImagery'
import { formatTimeToHour } from '../../utils/timeFormat'
import css from './OrderDetails.module.css'

const OrderDetails = ({
  deliveryDate,
  deliveryStartTime,
  deliveryEndTime,
  orderState,
  price,
  recipeImages,
}) => {
  const formattedPrice = new Intl.NumberFormat(
    'en-GB',
    { style: 'currency', currency: 'GBP', maximumFractionDigits: 2 },
  ).format(Number(price))

  const deliveryTimeToDisplay = `${formatTimeToHour(deliveryStartTime)} - ${formatTimeToHour(deliveryEndTime)}`

  return (
    <Fragment>
      <div className={css.title}>
        <span>{deliveryDate}</span>
        {price && <span data-testing="price">{formattedPrice}</span>}
      </div>
      {orderState && (
        <div className={css.spacing}>
          <OrderState state={orderState} />
        </div>
      )}
      {deliveryStartTime && deliveryEndTime && (
        <div className={css.spacing} data-testing="delivery-time">
          {deliveryTimeToDisplay}
        </div>
      )}
      <div className={css.spacing}>
        <RecipesImagery items={recipeImages} />
      </div>
    </Fragment>
  )
}

OrderDetails.propTypes = {
  deliveryDate: PropTypes.string,
  deliveryStartTime: PropTypes.string,
  deliveryEndTime: PropTypes.string,
  orderState: PropTypes.string,
  price: PropTypes.string,
  recipeImages: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string,
  })),
}

OrderDetails.defaultProps = {
  deliveryDate: '',
  deliveryStartTime: '',
  deliveryEndTime: '',
  orderState: '',
  price: '',
  recipeImages: [],
}

export { OrderDetails }
