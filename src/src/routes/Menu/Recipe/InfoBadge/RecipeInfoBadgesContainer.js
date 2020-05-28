import { connect } from 'react-redux'

import { getRecipeInfoBadgeSlugs } from '../../selectors/recipeInfoBadges'
import { InfoBadges } from './InfoBadges'

const mapStateToProps = (state, ownProps) => ({
  slugs: getRecipeInfoBadgeSlugs(state, ownProps)
})

const RecipeInfoBadgesContainer = connect(mapStateToProps)(InfoBadges)

export { RecipeInfoBadgesContainer }
