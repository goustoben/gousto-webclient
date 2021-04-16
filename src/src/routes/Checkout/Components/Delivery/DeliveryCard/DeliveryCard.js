import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'

import css from './DeliveryCard.css'

const DeliveryCard = ({ iconName, children }) => (
  <div className={css.deliveryCardContainer}>
    <Svg fileName={iconName} className={css.icon} />
    {children}
  </div>
)

DeliveryCard.propTypes = {
  iconName: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

export { DeliveryCard }
