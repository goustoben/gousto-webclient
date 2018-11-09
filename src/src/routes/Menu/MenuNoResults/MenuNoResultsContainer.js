import Immutable from 'immutable'
import { connect } from 'react-redux'

import MenuNoResults from './MenuNoResults'
import { initialState } from 'reducers/filters'
import trackingActions from 'actions/tracking'

const MenuNoResultsContainer = connect(({ filters, menu }) => {
  const nonCollectionFilters = initialState().set('currentCollectionId', filters.get('currentCollectionId', ''))

  return {
    hasFilters: !Immutable.is(filters, nonCollectionFilters),
    filtersMenuVisible: menu.get('filtersMenuVisible', false),
  }
}, {
  trackRecipeOrderDisplayed: trackingActions.trackRecipeOrderDisplayed,
})(MenuNoResults)

export default MenuNoResultsContainer
