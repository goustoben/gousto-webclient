import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { RecipeListContainer, FilteredRecipeListContainer } from '../RecipeList'
import { DetailOverlayContainer } from '../DetailOverlay'
import { CollectionHeaderWrapperContainer } from '../MenuRecipesPage/CollectionHeader'

import css from '../Menu.css'

class RecipeGrid extends PureComponent {
  static propTypes = {
    recipes: PropTypes.instanceOf(Immutable.List),
    filteredRecipeIds: PropTypes.instanceOf(Immutable.List),
  }

  static defaultProps = {
    recipes: null,
    filteredRecipeIds: null,
  }

  state = {
    shouldShowOverlay: false,
  }

  componentDidMount() {
    this.setState({ shouldShowOverlay: true })
  }

  render() {
    const { recipes, filteredRecipeIds } = this.props
    const { shouldShowOverlay } = this.state

    return (
      <div
        className={css.menuContainer}
        data-testing="menuRecipesList"
      >
        <CollectionHeaderWrapperContainer />
        {
          recipes === null
            ? <RecipeListContainer />
            : <FilteredRecipeListContainer recipes={recipes} filteredRecipeIds={filteredRecipeIds} />
        }
        <DetailOverlayContainer
          showOverlay={shouldShowOverlay}
        />
      </div>
    )
  }
}

export { RecipeGrid }
