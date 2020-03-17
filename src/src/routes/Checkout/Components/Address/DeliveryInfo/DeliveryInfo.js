import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

import Svg from 'Svg'
import css from './DeliveryInfo.css'

const DeliveryInfo = ({ deliveryDate, cutOffDate, frequency }) => {
  const deliveryDay = moment(deliveryDate).format('dddd')
  const cutOffDay = moment(cutOffDate).format('dddd')

  return (
    <div className={css.infoContainer}>
      <div className={css.flex}>
        <Svg fileName="icon-frequency" className={css.iconFrequency} />
        <div className={css.iconFrequencyDescription}>
          <p className={css.iconFrequencyText}>
            Your
            {' '}
            {frequency}
            {' '}
            Gousto box will arrive on
            {' '}
            {deliveryDay}
            s. You can edit your orders until midday on
            {' '}
            {cutOffDay}
            {' '}
            each
            {' '}
            {frequency.replace('ly', '')}
            , and make changes to your
            {' '}
            {frequency}
            {' '}
            subscription at any time.
          </p>
        </div>
      </div>
    </div>
  )
}

DeliveryInfo.propTypes = {
  deliveryDate: PropTypes.string,
  cutOffDate: PropTypes.string,
  frequency: PropTypes.string,
}

DeliveryInfo.defaultProps = {
  deliveryDate: '',
  cutOffDate: '',
  frequency: 'weekly',
}

export default DeliveryInfo
