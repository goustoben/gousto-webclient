import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Svg from 'Svg'

import css from './DeliveryCard.module.css'

const DeliveryCard = ({ iconName, children, dataTesting, cardStyle, customClass }) => (
  <div
    className={classNames(css.deliveryCardContainer, {
      [css[cardStyle]]: cardStyle !== 'default',
      [customClass]: customClass,
    })}
    data-testing={dataTesting}
  >
    <Svg fileName={iconName} className={css.icon} />
    {children}
  </div>
)

DeliveryCard.propTypes = {
  iconName: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  dataTesting: PropTypes.string,
  cardStyle: PropTypes.oneOf(['default', 'blue']),
  customClass: PropTypes.string,
}

DeliveryCard.defaultProps = {
  dataTesting: '',
  cardStyle: 'default',
  customClass: '',
}

export { DeliveryCard }
