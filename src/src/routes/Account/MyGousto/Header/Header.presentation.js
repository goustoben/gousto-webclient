import React from 'react'
import PropTypes from 'prop-types'
import config from 'config'
import { CardWithLink } from 'CardWithLink'
import { Button } from 'goustouicomponents'
import { windowOpen } from 'utils/window'
import { OrderDetails } from './OrderDetails/OrderDetails'
import css from './Header.css'

const HeaderPresentation = ({
  nextOrderId,
  nextOrderMessage,
  nextOrderHasTooltip,
  nextOrderTracking,
  previousOrderMessage,
  getHelpQueryParam,
  trackNextBoxTrackingClick,
  onPreviousBoxGetHelpClick,
}) => {
  const getHelpUrlSuffix = getHelpQueryParam
    || `/${config.routes.client.getHelp.contact}`

  const { client } = config.routes
  const hasNextOrder = nextOrderMessage.secondary

  const renderNextOrder = () => {
    const { linkLabel, linkUrl } = nextOrderMessage

    return (
      <CardWithLink
        linkLabel={linkLabel}
        linkUrl={linkUrl}
        clientRouted={!linkUrl.includes(client.myDeliveries)}
        tooltipContent={nextOrderHasTooltip
          && 'Any issues with this box? Let us know and we\'ll sort it out.'}
      >
        <OrderDetails heading="Your next box delivery">
          <div className={css.nextOrder}>
            <div className={css.orderDetailsItem}>
              <p className={css.message}><strong>{nextOrderMessage.primary}</strong></p>
              <p className={css.message}>{nextOrderMessage.secondary}</p>
            </div>
            {nextOrderTracking && (
              <div className={css.orderDetailsItem}>
                <Button
                  width="full"
                  onClick={() => {
                    trackNextBoxTrackingClick(nextOrderId)
                    windowOpen(nextOrderTracking)
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
  }

  const renderNoNextOrder = () => (
    <CardWithLink
      linkLabel={nextOrderMessage.linkLabel}
      linkUrl={nextOrderMessage.linkUrl}
    >
      <OrderDetails heading="Your next box delivery">
        <div className={css.orderDetailsItem}>
          <p className={css.message}><strong>{nextOrderMessage.primary}</strong></p>
        </div>
      </OrderDetails>
    </CardWithLink>
  )

  const renderPreviousOrder = () => (
    <CardWithLink
      linkLabel="Get help with this box"
      linkUrl={`${client.getHelp.index}${getHelpUrlSuffix}`}
      trackClick={onPreviousBoxGetHelpClick}
    >
      <OrderDetails heading="Your most recent box delivery">
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
    linkLabel: PropTypes.string,
    linkUrl: PropTypes.string,
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }),
  nextOrderHasTooltip: PropTypes.bool,
  nextOrderTracking: PropTypes.string,
  previousOrderMessage: PropTypes.string,
  getHelpQueryParam: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  trackNextBoxTrackingClick: PropTypes.func,
  onPreviousBoxGetHelpClick: PropTypes.func,
}

HeaderPresentation.defaultProps = {
  nextOrderId: null,
  nextOrderMessage: {
    linkLabel: null,
    linkUrl: null,
    primary: null,
    secondary: null,
  },
  nextOrderHasTooltip: false,
  nextOrderTracking: null,
  previousOrderMessage: null,
  getHelpQueryParam: false,
  trackNextBoxTrackingClick: () => {},
  onPreviousBoxGetHelpClick: () => {},
}

export { HeaderPresentation }
