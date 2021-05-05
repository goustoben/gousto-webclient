import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Svg from 'Svg'

import css from './DeliveryCard.css'

const DeliveryCard = ({ iconName, children, dataTesting, cardStyle }) => (
  <div
    className={classNames(css.deliveryCardContainer, { [css[cardStyle]]: cardStyle !== 'default' })}
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
  cardStyle: PropTypes.oneOfType(['default', 'blue']),
}

DeliveryCard.defaultProps = {
  dataTesting: '',
  cardStyle: 'default',
}

export { DeliveryCard }
