import { Paragraph, Color, FontWeight, Icon, Space, Box, AlignItems } from '@gousto-internal/citrus-react'
import PropTypes from 'prop-types'
import React from 'react'
import { ORDER_STATE_TO_COLOR_MAPPING } from 'routes/Account/AccountComponents/enum/enum'
import css from './OrderState.css'

const initcap = (word) => word.charAt(0).toUpperCase() + word.slice(1)
const toCamelCase = (str) => str.replace(/\b\w/g, chr => chr.toUpperCase()).replace(' ', '')
const mapResults = (state) => (state === 'Confirmed' ? "We're preparing your box" : state)

const OrderState = ({ orderState }) => {
  const state = initcap(orderState)
  const iconClass = `icon${toCamelCase(state)}`

  return (
    <div className={css.orderStateWrap} data-testing="orderState">
      { state === 'Confirmed' ?
        // eslint-disable-next-line react/jsx-wrap-multilines
        <Box
          bg={Color.ColdGrey_600}
          display="flex"
          alignItems={AlignItems.Center}
          borderRadius="round"
          paddingH={1}
        >
          <Icon
            size={3}
            name="arrow_right"
            style={{ color: 'white' }}
          />
        </Box>
        : <span className={css[iconClass]} />}
      <Space size={2} direction="horizontal" />
      <Paragraph fontWeight={FontWeight.SemiBold} color={ORDER_STATE_TO_COLOR_MAPPING[orderState]}>
        {mapResults(state)}
      </Paragraph>
    </div>
  )
}

OrderState.propTypes = {
  orderState: PropTypes.string,
}

OrderState.defaultProps = {
  orderState: '',
}

export default OrderState
