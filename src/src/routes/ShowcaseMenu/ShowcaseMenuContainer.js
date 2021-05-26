import { connect } from 'react-redux'
import { getCurrentCollectionId } from 'routes/Menu/selectors/collections'
import { getRecipeListRecipes } from 'routes/Menu/selectors/recipeList'
import { ShowcaseMenu } from './ShowcaseMenu'
import {
  proceed,
  changeCollection,
  openRecipeDetails,
  trackScrollOneStep,
} from './showcaseMenuActions'
import {
  getCollectionDescriptorsInLines,
  getCollectionDescriptorsSingleLine,
} from './showcaseMenuSelectors'

const mapStateToProps = (state) => {
  const currentCollectionId = getCurrentCollectionId(state)
  const { recipes } = getRecipeListRecipes(state)

  return {
    collectionDescriptorsInLines: getCollectionDescriptorsInLines(state),
    collectionDescriptorsSingleLine: getCollectionDescriptorsSingleLine(state),
    currentCollectionId,
    recipes,
  }
}

const mapDispatchToProps = {
  proceed,
  changeCollection,
  openRecipeDetails,
  trackScrollOneStep,
}

export const ShowcaseMenuContainer = connect(mapStateToProps, mapDispatchToProps)(ShowcaseMenu)
