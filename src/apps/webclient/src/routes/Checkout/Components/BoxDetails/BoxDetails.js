import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import Immutable from 'immutable'
import routes from 'config/routes'
import { getSlotTimes } from 'utils/deliveries'
import {
  Heading6,
  Link,
  Box,
  Space,
  Text,
  FontWeight,
  JustifyContent,
  Color,
} from '@gousto-internal/citrus-react'
import { RecipeSummary } from '../RecipeSummary'

export const BoxDetails = ({ numPortions, date, deliveryDays, slotId }) => {
  const deliveryDate = moment(date).format('dddd Do MMMM')
  const deliveryTime = getSlotTimes({ date, deliveryDays, slotId })

  return (
    <Box paddingH={6}>
      <Box display="flex" justifyContent={JustifyContent.SpaceBetween}>
        <Heading6>{`Your box (${numPortions} people)`}</Heading6>
        <Link size={1} href={routes.client.menu}>
          Edit order
        </Link>
      </Box>
      <Space size={5} />

      <RecipeSummary />

      <Box height="1px" bg={Color.NeutralGrey_100} />
      <Space size={4} />

      <Heading6>Delivery date</Heading6>
      <Space size={5} />
      <Text fontWeight={FontWeight.SemiBold}>{deliveryDate}</Text>
      <Text uppercase>{deliveryTime}</Text>
      <Space size={6} />
    </Box>
  )
}

BoxDetails.propTypes = {
  numPortions: PropTypes.number,
  deliveryDays: PropTypes.instanceOf(Immutable.Map).isRequired,
  slotId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

BoxDetails.defaultProps = {
  numPortions: 0,
}
