import React from 'react'
import PropTypes from 'prop-types'
import config from 'config'
import { CardWithLink } from 'CardWithLink'
import { OrderDetails } from './OrderDetails/OrderDetails'
import css from './Header.css'

const HeaderPresentation = ({
  nextOrderMessage,
  previousOrderMessage,
  getHelpQueryParam,
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
      <OrderDetails
        heading='Your next box delivery'
        messagePrimary={nextOrderMessage.primary}
        messageSecondary={nextOrderMessage.secondary}
      />
    </CardWithLink>
  )

  const renderNoNextOrder = () => (
    <CardWithLink
      linkLabel="View this week's menu"
      linkUrl={client.menu}
    >
      <OrderDetails
        heading='Your next box delivery'
        messagePrimary={nextOrderMessage.primary}
      />
    </CardWithLink>
  )

  return (
    <div className={css.cardsContainer}>
      {hasNextOrder ? renderNextOrder() : renderNoNextOrder()}

      {previousOrderMessage && (
        <CardWithLink
          linkLabel='Get help with this box'
          linkUrl={`${client.getHelp.index}${getHelpUrlSuffix}`}
        >
          <OrderDetails
            heading='Your most recent box delivery'
            messagePrimary={previousOrderMessage}
          />
        </CardWithLink>
      )}
    </div>
  )
}

HeaderPresentation.propTypes = {
  nextOrderMessage: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }),
  previousOrderMessage: PropTypes.string,
  getHelpQueryParam: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

HeaderPresentation.defaultProps = {
  nextOrderMessage: {
    primary: null,
    secondary: null,
  },
  previousOrderMessage: null,
  getHelpQueryParam: null,
}

export { HeaderPresentation }
