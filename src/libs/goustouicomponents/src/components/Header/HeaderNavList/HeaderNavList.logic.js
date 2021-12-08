import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { routes } from 'gousto-config'
import css from './HeaderNavList.module.css'

const { goustoWebclient } = routes

const ITEM_TRACKING_ACTIONS = {
  [goustoWebclient.help.label]: 'click_help_navigation',
}
const ITEMS_WITH_TRACKING = Object.keys(ITEM_TRACKING_ACTIONS)

const HeaderNavList = ({ hasDataTracking, isAuthenticated, items }) => {
  const itemsTrackingProperties = {
    [goustoWebclient.help.label]: JSON.stringify({ logged_in: isAuthenticated }),
  }

  return (
    <nav className={css.navListWrapper}>
      <ul className={css.navList}>
        {
          items.map((item) => (
            <li className={css.navListItem} key={item.label}>
              {ITEMS_WITH_TRACKING.includes(item.label) && hasDataTracking ? (
                <a
                  className={classnames(css.navListItemLink, { [css.navListItemLinkCTA]: item.highlightHeader })}
                  href={item.url}
                  data-tracking-action={ITEM_TRACKING_ACTIONS[item.label]}
                  data-tracking-property={itemsTrackingProperties[item.label]}
                >
                  {item.label}
                </a>
              ) : (
                <a
                  className={classnames(css.navListItemLink, { [css.navListItemLinkCTA]: item.highlightHeader })}
                  href={item.url}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

HeaderNavList.propTypes = {
  hasDataTracking: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    highlightHeader: PropTypes.bool,
  })).isRequired,
}

HeaderNavList.defaultProps = {
  hasDataTracking: false,
}

export {
  HeaderNavList,
  ITEM_TRACKING_ACTIONS,
}
