import { connect } from 'react-redux'
import filterActions from 'actions/filters'
import config from 'config/recipes'
import { getNumPortions } from 'selectors/basket'
import FilterTagsNav from './FilterTagsNav'

export default connect((state) => {
  const { filters } = state
  const dietaryAttributes = filters.get('dietaryAttributes', []).toArray()
  const totalTime = filters.get('totalTime', '0')
  const numPortions = getNumPortions(state)
  const dietryTags = [
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
  
  const cookingTimeTag = 
    (numPortions === 2) ? {
      text: config.totalTime['25'],
      type: 'totalTime',
      value: '25',
      selected: totalTime === '25',
    } : {
      text: config.totalTime['30'],
      type: 'totalTime',
      value: '30',
      selected: totalTime === '30',
    }
  const newRecipes = {
    text: config.newRecipes,
    type: 'new',
    value: '',
  }
  const tags = [ ...newRecipes, ...cookingTimeTag].filter(item => item && item.text)

  return {
    tags: tags,
    menuFilterExperiment: state.features.getIn(['filterMenu', 'value']),
    browser: state.request.get('browser'),
  }
}, {
  onCTAClick: filterActions.filterMenuOpen,
})(FilterTagsNav)
