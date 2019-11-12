import React from 'react'
import PropTypes from 'prop-types'
import config from 'config'
import { CardWithLink } from 'CardWithLink'
import css from './Header.css'

const noUpcomingOrders = () => (
  <p className={css.headerText}>
    No boxes scheduled
  </p>
)

const upcomingOrder = (messagePrimary, messageSecondary) => (
  <div>
    <p className={css.headerText}>{messagePrimary}</p>
    <p className={css.headerText}>{messageSecondary}</p>
  </div>
)

const HeaderPresentation = ({
  nextOrderMessage,
  previousOrderMessage,
  getHelpQueryParam,
}) => {
  const getHelpUrlSuffix = getHelpQueryParam
    ? getHelpQueryParam
    : `/${config.routes.client.getHelp.contact}`

  const { client } = config.routes

  return (
    <div className={css.cardsContainer}>
      {
        nextOrderMessage.secondary ? (
          <CardWithLink
            linkLabel='View my deliveries'
            linkUrl={client.myDeliveries}
            clientRouted={false}
          >
            <p>Your next box delivery</p>
            {upcomingOrder(nextOrderMessage.primary, nextOrderMessage.secondary)}
          </CardWithLink>
        ) : (
          <CardWithLink linkLabel="View this week's menu" linkUrl={client.menu}>
            <p>Your next box delivery</p>
            {noUpcomingOrders()}
          </CardWithLink>
        )
      }

      <CardWithLink
        linkLabel='Get help with this box'
        linkUrl={`${client.getHelp.index}${getHelpUrlSuffix}`}
      >
        <h4>Your most recent box delivery</h4>
        {previousOrderMessage && (
          <p className={css.headerText}>
            {previousOrderMessage}
          </p>
        )}
      </CardWithLink>
    </div>
  )
}

HeaderPresentation.propTypes = {
  nextOrderMessage: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }),
  previousOrderMessage: PropTypes.string,
  getHelpQueryParam: PropTypes.string,
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
