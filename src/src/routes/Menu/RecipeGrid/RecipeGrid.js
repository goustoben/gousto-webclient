import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { RecipeListContainer, FilteredRecipeListContainer } from '../RecipeList'
import DetailOverlay from '../DetailOverlay'

import css from '../Menu.css'

class RecipeGrid extends PureComponent {
  static propTypes = {
    recipes: PropTypes.instanceOf(Immutable.List),
    filteredRecipeIds: PropTypes.instanceOf(Immutable.List),
    isFoodBrandClickable: PropTypes.bool
  }

  static defaultProps = {
    recipes: null,
    filteredRecipeIds: null,
    isFoodBrandClickable: true
  }

  state = {
    shouldShowOverlay: false,
  }

  componentDidMount() {
    this.setState({ shouldShowOverlay: true })
  }

  render() {
    const { recipes, filteredRecipeIds, isFoodBrandClickable } = this.props
    const { shouldShowOverlay } = this.state

    return (
      <div
        className={css.menuContainer}
        data-testing="menuRecipesList"
      >
        {
          recipes === null
            ? <RecipeListContainer isFoodBrandClickable={isFoodBrandClickable} />
            : <FilteredRecipeListContainer recipes={recipes} filteredRecipeIds={filteredRecipeIds} isFoodBrandClickable={isFoodBrandClickable} />
        }
        <DetailOverlay
          showOverlay={shouldShowOverlay}
        />
      </div>
    )
  }
}

export { RecipeGrid }
