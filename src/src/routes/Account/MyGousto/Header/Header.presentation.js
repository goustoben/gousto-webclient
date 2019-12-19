import React from 'react'
import PropTypes from 'prop-types'
import config from 'config'
import { CardWithLink } from 'CardWithLink'
import { Button } from 'goustouicomponents'
import { OrderDetails } from './OrderDetails/OrderDetails'
import css from './Header.css'

const HeaderPresentation = ({
  nextOrderId,
  nextOrderMessage,
  nextOrderTracking,
  previousOrderMessage,
  getHelpQueryParam,
  trackNextBoxTrackingClick,
}) => {
  const getHelpUrlSuffix = getHelpQueryParam
    ? getHelpQueryParam
    : `/${config.routes.client.getHelp.contact}`

  const { client } = config.routes
  const hasNextOrder = nextOrderMessage.secondary

  const renderNextOrder = () => (
    <CardWithLink
      linkLabel='View my deliveries'
      linkUrl={client.myDeliveries}
      clientRouted={false}
    >
      <OrderDetails heading='Your next box delivery'>
        <div className={css.nextOrder}>
          <div className={css.orderDetailsItem}>
            <p className={css.message}><strong>{nextOrderMessage.primary}</strong></p>
            <p className={css.message}>{nextOrderMessage.secondary}</p>
          </div>
          {nextOrderTracking && (
            <div className={css.orderDetailsItem}>
              <Button
                width='full'
                onClick={() => {
                  trackNextBoxTrackingClick(nextOrderId)
                  window.open(nextOrderTracking, 'rel="noopener noreferrer"')
                }}
              >
                Track my box
              </Button>
            </div>
          )}
        </div>
      </OrderDetails>
    </CardWithLink>
  )

  const renderNoNextOrder = () => (
    <CardWithLink
      linkLabel="View this week's menu"
      linkUrl={client.menu}
    >
      <OrderDetails heading='Your next box delivery'>
        <div className={css.orderDetailsItem}>
          <p className={css.message}><strong>{nextOrderMessage.primary}</strong></p>
        </div>
      </OrderDetails>
    </CardWithLink>
  )

  const renderPreviousOrder = () => (
    <CardWithLink
      linkLabel='Get help with this box'
      linkUrl={`${client.getHelp.index}${getHelpUrlSuffix}`}
    >
      <OrderDetails heading='Your most recent box delivery'>
        <div className={css.orderDetailsItem}>
          <p className={css.message}><strong>{previousOrderMessage}</strong></p>
        </div>
      </OrderDetails>
    </CardWithLink>
  )

  return (
    <div className={css.cardsContainer}>
      {hasNextOrder ? renderNextOrder() : renderNoNextOrder()}
      {previousOrderMessage && renderPreviousOrder()}
    </div>
  )
}

HeaderPresentation.propTypes = {
  nextOrderId: PropTypes.string,
  nextOrderMessage: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }),
  nextOrderTracking: PropTypes.string,
  previousOrderMessage: PropTypes.string,
  getHelpQueryParam: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  trackNextBoxTrackingClick: PropTypes.func,
}

HeaderPresentation.defaultProps = {
  nextOrderId: null,
  nextOrderMessage: {
    primary: null,
    secondary: null,
  },
  nextOrderTracking: null,
  previousOrderMessage: null,
  getHelpQueryParam: false,
  trackNextBoxTrackingClick: () => {},
}

export { HeaderPresentation }
