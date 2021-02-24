import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { RecipeListContainer, FilteredRecipeListContainer } from '../RecipeList'
import { DetailOverlayContainer } from '../DetailOverlay'

import css from '../Menu.css'

class RecipeGrid extends PureComponent {
  constructor() {
    super()
    this.state = {
      shouldShowOverlay: false,
    }
  }

  componentDidMount() {
    this.setState({ shouldShowOverlay: true })
  }

  render() {
    const { recipes, originalOrderRecipeIds, query } = this.props
    const { shouldShowOverlay } = this.state

    return (
      <div
        className={css.menuContainer}
        data-testing="menuRecipesList"
      >
        {
          recipes === null
            ? <RecipeListContainer query={query} />
            : <FilteredRecipeListContainer recipes={recipes} originalOrderRecipeIds={originalOrderRecipeIds} />
        }
        <DetailOverlayContainer
          showOverlay={shouldShowOverlay}
        />
      </div>
    )
  }
}

RecipeGrid.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List),
  originalOrderRecipeIds: PropTypes.instanceOf(Immutable.List),
  query: PropTypes.shape({
    collection: PropTypes.string,
  }),
}

RecipeGrid.defaultProps = {
  recipes: null,
  originalOrderRecipeIds: null,
  query: {}
}

export { RecipeGrid }
