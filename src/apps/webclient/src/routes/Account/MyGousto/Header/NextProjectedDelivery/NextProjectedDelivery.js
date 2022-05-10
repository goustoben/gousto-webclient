import React from 'react'
import PropTypes from 'prop-types'
import { Card, CTA, Heading } from 'goustouicomponents'
import { client } from 'config/routes'
import Link from 'components/Link'
import { OrderDetails } from 'routes/Account/AccountComponents/OrderDetails'

const NextProjectedDelivery = ({ deliveryDate }) => (
  <div>
    <Heading size="fontStyleM" type="h2">
      Upcoming delivery
    </Heading>
    <Card>
      <OrderDetails
        deliveryDate={deliveryDate}
        orderState="scheduled"
      />
      <Link to={client.myDeliveries}>
        <CTA
          isFullWidth
          onClick={() => {}}
          size="small"
          variant="secondary"
        >
          View my upcoming deliveries
        </CTA>
      </Link>
    </Card>
  </div>
)

NextProjectedDelivery.propTypes = {
  deliveryDate: PropTypes.string.isRequired,
}

export { NextProjectedDelivery }
