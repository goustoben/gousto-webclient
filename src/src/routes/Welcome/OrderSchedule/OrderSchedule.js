import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import OrderSummary from 'containers/welcome/OrderSummary'
import { capitalizeFirstLetter } from 'utils/text'

import css from './OrderSchedule.css'
import { EventDate } from './EventDate'

const propTypes = {
  deliveryDate: PropTypes.string.isRequired,
  nameFirst: PropTypes.string,
  whenCutoff: PropTypes.string.isRequired,
  interval: PropTypes.string,
}

const defaultProps = {
  nameFirst: '',
  interval: 'weekly',
}

const isValidDate = (date) =>
  (date && date.length) || typeof date === 'object'

const OrderSchedule = ({
  deliveryDate,
  nameFirst,
  whenCutoff,
  interval,
}) => {
  const isValidDeliveryDate = isValidDate(deliveryDate)
  const isValidWhenCutoff = isValidDate(deliveryDate)

  return (
    <div data-testing="orderScheduleContainer" className={css.container}>
      <div className={css.header}>
        <h2>
          {`Congrats on ordering your first box, ${capitalizeFirstLetter(nameFirst)}!`}
        </h2>
        <p className={css.headerSpacing}>
          Don&apos;t forget our menu changes every Tuesday - there will be new recipes for you to try every week.
        </p>
        <h2>What happens next?</h2>
      </div>
      <div className={css.scheduleItem}>
        <div>
          <EventDate date={isValidWhenCutoff && deliveryDate} />
          <div className={css.verticalLine} />
        </div>
        <div className={css.information}>
          <h3>1st box delivery</h3>
          <p>
            {`Changes can be made up until ${isValidWhenCutoff ? moment(whenCutoff, 'YYYY-MM-DD').format('dddd Do MMMM') : ''}`}
          </p>
          <div className={css.mobileShow}>
            <OrderSummary />
          </div>
        </div>
      </div>
      <div className={css.scheduleItem}>
        <div>
          <EventDate date={isValidDeliveryDate && moment(deliveryDate, 'YYYY-MM-DD').add(4, 'days')} />
          <div className={css.verticalLine} />
        </div>
        <div className={css.information}>
          <h3>2nd box cut-off</h3>
          <p>
            Pick your recipes
            <b> before 12pm </b>
            on this date (don’t worry we&apos;ll remind you).
            <b> If you miss this we&apos;ll choose for you.</b>
          </p>
        </div>
      </div>
      <div className={css.scheduleItem}>
        <div>
          <EventDate date={isValidDeliveryDate && moment(deliveryDate, 'YYYY-MM-DD').add(7, 'days')} />
        </div>
        <div className={css.information}>
          <h3>2nd box delivery</h3>
          <p>
            Your
            <b>
              {` ${interval} `}
            </b>
            boxes will arrive every
            {` ${isValidDeliveryDate ? moment(deliveryDate, 'YYYY-MM-DD').format('dddd') : ''} `}
            and you can get tracking information on the day.
          </p>
        </div>
      </div>
    </div>
  )
}

OrderSchedule.propTypes = propTypes
OrderSchedule.defaultProps = defaultProps

export { OrderSchedule }
