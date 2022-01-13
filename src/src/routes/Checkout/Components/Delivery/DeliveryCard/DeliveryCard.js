import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Svg from 'Svg'
import { Box, Color, BorderStyle, Icon, FlexDirection, Space } from '@gousto-internal/citrus-react'

import css from './DeliveryCard.css'

const DeliveryCard = ({ iconName, children, dataTesting, cardStyle, customClass }) => {
  const renderIcon = () => {
    switch (iconName) {
      case 'icon-calendar':
        return <Icon variant="Inherit" name="calendar" />
      case 'icon-home':
        return <Icon variant="Inherit" name="home" />
      default:
        return <Svg fileName={iconName} className={css.icon} />
    }
  }

  return (
    <>
      <Box
        bg={cardStyle === 'blue' && Color.Informative_50}
        borderStyle={BorderStyle.Solid}
        borderColor={cardStyle === 'blue' ? Color.Informative_200 : Color.ColdGrey_100}
        borderRadius={2}
        borderWidth={0.5}
        paddingV={4}
        paddingH={4}
        display="flex"
        flexDirection={FlexDirection.Row}
      >
        {renderIcon()}
        <Space direction="horizontal" size={3} />
        {children}
      </Box>
      <Space size={4} />
      {/* <div
        className={classNames(css.deliveryCardContainer, {
          [css[cardStyle]]: cardStyle !== 'default',
          [customClass]: customClass,
        })}
        data-testing={dataTesting}
      >
        <Svg fileName={iconName} className={css.icon} />
        {children}
      </div> */}
    </>
  )
}

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
