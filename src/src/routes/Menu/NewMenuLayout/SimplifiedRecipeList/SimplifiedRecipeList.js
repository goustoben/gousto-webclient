import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { arrayToColumns } from '../../RecipeList/arrayToColumns'
import { getNoOfColumns } from './utils/columns'
import { CTACard } from '../../RecipeList/CTACard'
import css from './SimplifiedRecipeList.css'

import { GridRecipeSmallTilesContainer } from '../GridRecipeSmallTiles'
import { CollectionsHeader } from '../CollectionsHeader'

class SimplifiedRecipeList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      detailHover: false,
    }
  }

  componentDidMount() {
    this.trackRecipeOrderDisplayed()
  }

  componentDidUpdate() {
    this.trackRecipeOrderDisplayed()
  }

  highlight = () => {
    this.setState({ detailHover: true })
  }

  unhighlight = () => {
    this.setState({ detailHover: false })
  }

  returnRecipesForColumn = (recipes, idx) => {
    const { detailHover } = this.state
    const { changeCollectionToAllRecipesViaCTA, isCurrentCollectionRecommendation } = this.props
    const COLUMN_INDEX = 2

    return (
      <div className={css.recipesColumn} key={idx + 1}>
        {
          recipes.map(({index, value}) => (
            <GridRecipeSmallTilesContainer
              recipe={value}
              key={value.get('id')}
              position={index + 1}
              highlight={this.highlight}
              unhighlight={this.unhighlight}
              detailHover={detailHover}
            />
          ))
        }
        {idx === COLUMN_INDEX
        && (
        <CTACard
          isCurrentCollectionRecommendation={isCurrentCollectionRecommendation}
          collectionFilterChange={changeCollectionToAllRecipesViaCTA}
        />
        )}
      </div>
    )
  }

  trackRecipeOrderDisplayed() {
    const { recipes, recipeIds, trackRecipeOrderDisplayed } = this.props

    const deafultOrderRecipeIds = recipes.map(recipe => recipe.get('id'))

    trackRecipeOrderDisplayed(
      recipeIds.toJS(),
      deafultOrderRecipeIds.toJS()
    )
  }

  render() {
    const {
      recipes,
      currentCollectionTitle
    } = this.props
    const noOfColumns = getNoOfColumns()
    const recipeArr = recipes && recipes.toArray()

    const columns = arrayToColumns(recipeArr, noOfColumns, 0)

    return (
      <div className={css.recipeListContainer}>
        <CollectionsHeader currentCollectionTitle={currentCollectionTitle} />
        <div className={css.columnsContainer}>
          {
            columns.map(this.returnRecipesForColumn)
          }
        </div>
      </div>
    )
  }
}

SimplifiedRecipeList.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  recipeIds: PropTypes.instanceOf(Immutable.List).isRequired,
  trackRecipeOrderDisplayed: PropTypes.func.isRequired,
  changeCollectionToAllRecipesViaCTA: PropTypes.func.isRequired,
  isCurrentCollectionRecommendation: PropTypes.bool.isRequired,
  currentCollectionTitle: PropTypes.string.isRequired
}

export { SimplifiedRecipeList }
