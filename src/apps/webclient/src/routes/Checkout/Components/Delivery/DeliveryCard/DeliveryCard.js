import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Color,
  BorderStyle,
  Icon,
  FlexDirection,
  Space,
  IconVariant,
} from '@gousto-internal/citrus-react'
import Svg from 'Svg'
import css from './DeliveryCard.css'

const DeliveryCardIcon = ({ name }) => {
  switch (name) {
    case 'icon-calendar':
      return (
        <Box color={Color.Informative_900}>
          <Icon variant={IconVariant.Inherit} name="calendar" style={{ display: 'block' }} />
        </Box>
      )
    case 'icon-home':
      return <Icon variant={IconVariant.Default} name="home" />
    default:
      return <Svg fileName={name} className={css.icon} />
  }
}

const DeliveryCard = ({ iconName, children, dataTesting, cardStyle, customClass }) => (
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
      data-testing={dataTesting}
      className={customClass}
    >
      <DeliveryCardIcon name={iconName} />
      <Space direction="horizontal" size={4} />
      {children}
    </Box>
    <Space size={4} />
  </>
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

DeliveryCardIcon.propTypes = {
  name: PropTypes.string,
}

DeliveryCardIcon.defaultProps = {
  name: null,
}

export { DeliveryCard }
