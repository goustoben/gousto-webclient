import React from 'react'
import PropTypes from 'prop-types'
import config from 'config'
import { CardWithLink } from 'CardWithLink'
import css from './Header.css'

const noUpcomingOrders = () => (
  <p className={css.headerText}>
    Looks like you don’t have any recipe boxes ordered. To add one, simply
    choose recipes from
  </p>
)

const upcomingOrder = message => (
  <p className={css.headerText}>
    {message}
  </p>
)

const HeaderPresentation = ({
  nextOrderMessage = null,
  previousOrderMessage = null,
  getHelpQueryParam = null
}) => {
  const getHelpUrlSuffix = getHelpQueryParam
    ? getHelpQueryParam
    : `/${config.routes.client.getHelp.contact}`

  const { client } = config.routes

  return (
    <div className={css.cardsContainer}>
      {
        nextOrderMessage ? (
          <CardWithLink
            linkLabel='View my deliveries'
            linkUrl={client.myDeliveries}
            clientRouted={false}
          >
            {upcomingOrder(nextOrderMessage)}
          </CardWithLink>
        ) : (
          <CardWithLink linkLabel="View this week's menu" linkUrl={client.menu}>
            {noUpcomingOrders()}
          </CardWithLink>
        )
      }

      <CardWithLink
        linkLabel='Get help with this box'
        linkUrl={`${client.getHelp.index}${getHelpUrlSuffix}`}
      >
        {previousOrderMessage && (
          <p className={css.headerText}>
            Your most recent box was delivered {previousOrderMessage}.
          </p>
        )}
      </CardWithLink>
    </div>
  )
}

HeaderPresentation.propTypes = {
  nextOrderMessage: PropTypes.string,
  previousOrderMessage: PropTypes.string,
  getHelpQueryParam: PropTypes.string
}

export { HeaderPresentation }
