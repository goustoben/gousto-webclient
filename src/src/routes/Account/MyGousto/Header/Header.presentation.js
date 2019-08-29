import React from 'react'
import config from 'config'

const noUpcomingOrders = () => (
  <span>Looks like you don’t have any recipe boxes ordered. To add one, simply choose recipes from
    <a className="highlight-text-link" href={config.routes.client.menu}>this week’s menu
      {/* <span className="glyphicon glyphicon-menu-right header-text-icon" aria-hidden="true"></span> */}
    </a>
  </span>
)

const upcomingOrder = (message) => (
  <span>{message}
    <a className="highlight-text-link" href={config.routes.client.myDeliveries}>Your Deliveries
      <span className="glyphicon glyphicon-menu-right header-text-icon" aria-hidden="true"></span>
    </a>
  </span>
)

const HeaderPresentation = ({ nextOrderMessage, lastOrderMessage }) => (
  <div>
    {nextOrderMessage ? upcomingOrder(nextOrderMessage) : noUpcomingOrders()}
    <p>Your most recent box was delivered on {lastOrderMessage}. <a href={config.routes.client.getHelp.index}>Get help with this box</a></p>
  </div>
)

export { HeaderPresentation }
