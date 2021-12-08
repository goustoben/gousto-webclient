import React from 'react'
import PropTypes from 'prop-types'
import { routes } from 'gousto-config'
import { HeaderNavExtendedItemLink } from '../HeaderNavExtendedItemLink'
import css from './HeaderNavExtendedSublist.module.css'

const { goustoWebclient } = routes
const ITEM_TRACKING_ACTIONS = {
  [goustoWebclient.help.label]: 'click_help_navigation',
}
const ITEMS_WITH_TRACKING = Object.keys(ITEM_TRACKING_ACTIONS)

const HeaderNavExtendedSublist = ({
  hasDataTracking,
  isAuthenticated,
  items,
  isExtendedNavigationVisible,
}) => {
  const itemsTrackingProperties = {
    [goustoWebclient.help.label]: JSON.stringify({ logged_in: isAuthenticated }),
  }

  return (
    <ul className={css.navExtenedSublist}>
      {
        items.map((item) => (
          ITEMS_WITH_TRACKING.includes(item.label) && hasDataTracking ? (
            <li
              key={item.label}
              data-tracking-action={ITEM_TRACKING_ACTIONS[item.label]}
              data-tracking-property={itemsTrackingProperties[item.label]}
            >
              <HeaderNavExtendedItemLink item={item} isExtendedNavigationVisible={isExtendedNavigationVisible} />
            </li>
          ) : (
            <li key={item.label}>
              <HeaderNavExtendedItemLink item={item} isExtendedNavigationVisible={isExtendedNavigationVisible} />
            </li>
          )
        ))
      }
    </ul>
  )
}

HeaderNavExtendedSublist.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    highlightHeader: PropTypes.bool,
  }).isRequired).isRequired,
  isExtendedNavigationVisible: PropTypes.bool.isRequired,
  hasDataTracking: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
}

HeaderNavExtendedSublist.defaultProps = {
  hasDataTracking: false,
}

export {
  HeaderNavExtendedSublist,
  ITEM_TRACKING_ACTIONS,
}
