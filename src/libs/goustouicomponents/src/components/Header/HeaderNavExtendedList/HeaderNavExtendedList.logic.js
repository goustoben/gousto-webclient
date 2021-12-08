import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './HeaderNavExtendedList.module.css'
import { HeaderNavExtendedItemLink } from '../HeaderNavExtendedItemLink'
import { HeaderNavExtendedSublist } from '../HeaderNavExtendedSublist'

const HeaderNavExtendedList = ({
  hasDataTracking,
  isAuthenticated,
  items,
  isExtendedNavigationVisible,
}) => (
  <nav className={classnames(css.navExtendedListWrapper, { [css.isVisible]: isExtendedNavigationVisible })}>
    <ul className={css.navExtendedList}>
      {
        items.map((item) => (
          <li className={css.navExtendedListItem} key={item.label}>
            <HeaderNavExtendedItemLink item={item} isExtendedNavigationVisible={isExtendedNavigationVisible} />
            {
              item.subItems
              && (
                <HeaderNavExtendedSublist
                  items={item.subItems}
                  isExtendedNavigationVisible={isExtendedNavigationVisible}
                  isAuthenticated={isAuthenticated}
                  hasDataTracking={hasDataTracking}
                />
              )
            }
          </li>
        ))
      }
    </ul>
  </nav>
)

const itemProps = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  highlightHeader: PropTypes.bool,
}

HeaderNavExtendedList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    ...itemProps,
    subItems: PropTypes.arrayOf(PropTypes.shape(itemProps)),
  })).isRequired,
  isExtendedNavigationVisible: PropTypes.bool.isRequired,
  hasDataTracking: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
}

HeaderNavExtendedList.defaultProps = {
  hasDataTracking: false,
}

export {
  HeaderNavExtendedList,
}
