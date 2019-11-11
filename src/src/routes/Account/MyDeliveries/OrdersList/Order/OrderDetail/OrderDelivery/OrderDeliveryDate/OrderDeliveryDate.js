import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'goustouicomponents'
import { EditDate } from './EditDate'
import { LinkButton } from './Link'
import css from './OrderDeliveryDate.css'

const propTypes = {
  date: PropTypes.string,
  timeStart: PropTypes.string,
  timeEnd: PropTypes.string,
  hasError: PropTypes.bool,
  orderState: PropTypes.string,
  editDeliveryMode: PropTypes.bool,
  onClickFunction: PropTypes.func,
  fetchSuccess: PropTypes.bool,
  orderId: PropTypes.string,
  availableFrom: PropTypes.string,
  availableTo: PropTypes.string
}

const OrderDeliveryDate = ({
  date,
  timeStart,
  timeEnd,
  hasError,
  orderState,
  editDeliveryMode,
  onClickFunction,
  fetchSuccess,
  orderId,
  availableFrom,
  availableTo
}) => {
  console.log('fetchSuccess', fetchSuccess) //eslint-disable-line
  console.log('editDeliveryMode', editDeliveryMode) //eslint-disable-line

  return (
    <div>
      <div className={css.header}>
        <div className={css.details}>
          <div className={`${css.bold} ${css.subHeader}`}>
            Date and time
          </div>
          <div className={`${css.bold} ${css.dateTime}`}>
            {date}
          </div>
          <div className={css.dateTime}>
            {timeStart} - {timeEnd}
          </div>
        </div>
        {['recipes chosen', 'menu open'].indexOf(orderState) > -1 ?
          <div className={css.button}>
            <LinkButton onClick={onClickFunction} text={editDeliveryMode ? 'Cancel' : 'Change'} />
          </div>
          : null}
      </div>
      {hasError ?
        <div>
          <Alert type="danger">
            There was a problem editing your order. Please try again later.
          </Alert>
        </div>
        : null}
      {editDeliveryMode && fetchSuccess &&
        <EditDate
          editDeliveryMode={editDeliveryMode}
          orderId={orderId}
          availableFrom={availableFrom}
          availableTo={availableTo}
        />
      }
    </div>
  )
}

OrderDeliveryDate.propTypes = propTypes

export { OrderDeliveryDate }
