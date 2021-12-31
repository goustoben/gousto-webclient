import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import Immutable from 'immutable'
import routes from 'config/routes'
// import Link from 'Link'
import { getSlotTimes } from 'utils/deliveries'
import { jsx } from '@emotion/react'
import {
  Box,
  Heading6,
  Link,
  FlexDirection,
  JustifyContent,
  Text,
  FontWeight,
  Space,
} from '@gousto-internal/zest-react'
import { RecipeSummary } from '../RecipeSummary'
import css from './BoxDetails.css'

export const BoxDetails = ({ numPortions, date, deliveryDays, slotId }) => {
  const deliveryDate = moment(date).format('dddd Do MMMM')
  const deliveryTime = getSlotTimes({ date, deliveryDays, slotId })

  return (
    <div className={css.container} data-testing="checkoutBoxDetailsSection">
      {/* <div className={css.headerWrapper}>
        <h3 className={css.header}>{`Your box (${numPortions} people)`}</h3>
        <span className={css.editOrder}>
          <Link to={routes.client.menu} clientRouted>
            Edit order
          </Link>
        </span>
      </div> */}
      <Box
        justifyContent={JustifyContent.SpaceBetween}
        display="flex"
        flexDirection={FlexDirection.Row}
        paddingBottom={5}
      >
        <Heading6>{`Your box (${numPortions} people)`}</Heading6>
        <Link href={routes.client.menu} size={1}>
          Edit order
        </Link>
      </Box>

      <RecipeSummary />

      <Space size={3} direction="vertical" />
      <div className={css.separator} />
      <Heading6>Delivery date</Heading6>
      <Space size={5} direction="vertical" />
      <Text fontWeight={FontWeight.SemiBold}>{deliveryDate}</Text>
      <Text>{deliveryTime}</Text>

      {/* <div className={css.headerWrapper}>
        <h3 className={css.header}>Delivery date</h3>
      </div>
      <p className={css.deliveryDate}>{deliveryDate}</p>
      <p className={css.deliveryTime}>{deliveryTime}</p> */}
    </div>
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
