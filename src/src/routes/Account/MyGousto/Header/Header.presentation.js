import React from 'react'
import PropTypes from 'prop-types'
import config from 'config'
import css from './Header.css'

const noUpcomingOrders = () => (
  <p className={css.headerText}>
    Looks like you don’t have any recipe boxes ordered. To add one, simply
    choose recipes from
    <a href={config.routes.client.menu}>
      {' '}
      this week’s menu&nbsp;
      <span className={css.arrowRight} />
    </a>
  </p>
)

const upcomingOrder = message => (
  <p className={css.headerText}>
    {message}
    <a href={config.routes.client.myDeliveries}>
      My Deliveries&nbsp;
      <span className={css.arrowRight} />
    </a>
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

  return (
    <div>
      {nextOrderMessage ? upcomingOrder(nextOrderMessage) : noUpcomingOrders()}
      {previousOrderMessage && (
        <p className={css.headerText}>
          Your most recent box was delivered {previousOrderMessage}.
          <a href={`${config.routes.client.getHelp.index}${getHelpUrlSuffix}`}>
            {' '}
            Get help with this box&nbsp;
            <span className={css.arrowRight} />
          </a>
        </p>
      )}
    </div>
  )
}

HeaderPresentation.propTypes = {
  nextOrderMessage: PropTypes.string,
  previousOrderMessage: PropTypes.string,
  getHelpQueryParam: PropTypes.string
}

export { HeaderPresentation }
