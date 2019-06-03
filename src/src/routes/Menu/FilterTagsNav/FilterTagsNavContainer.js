import { connect } from 'react-redux'
import filterActions from 'actions/filters'
import config from 'config/recipes'

import FilterTagsNav from './FilterTagsNav'

export default connect((state) => {
  const { filters } = state
  const dietaryAttributes = filters.get('dietaryAttributes', []).toArray()
  const tags = [
    {
      text: config.dietaryAttributes['gluten-free'],
      type: 'dietaryAttribute',
      value: 'gluten-free',
      selected: dietaryAttributes.includes('gluten-free'),
    },
    {
      text: config.dietaryAttributes['dairy-free'],
      type: 'dietaryAttribute',
      value: 'dairy-free',
      selected:  dietaryAttributes.includes('dairy-free'),
    }
  ].filter(item => item && item.text)

  return {
    tags,
    menuFilterExperiment: state.features.getIn(['filterMenu', 'value']),
    browser: state.request.get('browser'),
  }
}, {
  onCTAClick: filterActions.filterMenuOpen,
})(FilterTagsNav)
