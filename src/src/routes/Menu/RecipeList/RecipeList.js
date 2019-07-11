import React from 'react'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component'
import Immutable from 'immutable'
import classnames from 'classnames'
import Recipe from 'containers/menu/Recipe'
import { getFeaturedImage } from 'utils/image'
import { isRecommendedRecipe } from 'utils/menu'
import { formatRecipeTitle, getFoodBrand } from 'utils/recipe'
import actions from 'actions/tracking'

import css from './RecipeList.css'

class RecipeList extends React.Component {
  static propTypes = {
    allRecipesList: PropTypes.instanceOf(Immutable.List),
    cutoffDate: PropTypes.string,
    isLoading: PropTypes.bool,
    features: PropTypes.instanceOf(Immutable.Map),
    filteredRecipeIds: PropTypes.instanceOf(Immutable.List),
    filterMenuOpen: PropTypes.bool,
    featuredRecipes: PropTypes.instanceOf(Immutable.List),
    remainingRecipes: PropTypes.instanceOf(Immutable.List),
    outOfStockRecipes: PropTypes.instanceOf(Immutable.List),
    mobileGridView: PropTypes.bool,
    numPortions: PropTypes.number.isRequired,
    recipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
    showDetailRecipe: PropTypes.func,
    isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    collectionFilterChange: PropTypes.func,
    sortedRecipes: PropTypes.instanceOf(Immutable.List),
  }

  static defaultProps = {
    filteredRecipeIds: Immutable.List([]),
    featuredRecipes: Immutable.List([]),
    remainingRecipes: Immutable.List([]),
    outOfStockRecipes: Immutable.List([]),
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    const needsUpdate = ['mobileGridView', 'filterMenuOpen', 'recipesStore', 'cutoffDate', 'numPortions', 'isLoading', 'featuredRecipes', 'outOfStockRecipes', 'remainingRecipes', 'sortedRecipes']

    let shouldUpdate = false
    needsUpdate.some((prop) => {
      if (this.props[prop] !== nextProps[prop]) {
        shouldUpdate = true

        return shouldUpdate
      }

      return false
    })

    if (nextProps.isLoading) {
      shouldUpdate = false
    }

    return shouldUpdate
  }

  componentDidMount() {
    this.trackRecipeOrderDisplayed()
  }

  componentDidUpdate(prevProps) {
    const { mobileGridView } = this.props
    if (prevProps.mobileGridView !== mobileGridView) {
      this.masonry.options.columnWidth = (mobileGridView) ? '.gridSizerMobile' : '.gridSizer'
      this.masonry.layout()
    }
    this.trackRecipeOrderDisplayed()
  }

  getView = (mobileGridView, isFeatured = false, isFineDineIn = false) => {
    let view = 'grid'
    if (mobileGridView) {
      view = 'gridSmall'
    } else if (isFeatured) {
      view = 'featured'
    } else if (isFineDineIn) {
      view = 'fineDineIn'
    }

    return view
  }

  trackRecipeOrderDisplayed() {
    const { filteredRecipeIds, featuredRecipes, remainingRecipes } = this.props
    this.context.store.dispatch(actions.trackRecipeOrderDisplayed(
      filteredRecipeIds.toJS(),
      (featuredRecipes.concat(remainingRecipes)).map(recipe => recipe.get('id')).toJS()
    ))
  }

  listOfRecipes = () => {
    const {
      mobileGridView,
      numPortions,
      features,
      cutoffDate,
      allRecipesList,
      recipesStore,
      showDetailRecipe,
      featuredRecipes,
      isCurrentCollectionRecommendation,
      collectionFilterChange,
      sortedRecipes
    } = this.props
    let index = 0

    const newRecipeList = sortedRecipes.map((recipe) => {
      const recipeId = recipe.get('id')
      const isFeatured = featuredRecipes.includes(recipe)
      const range = getFoodBrand(recipe)
      const isFineDineIn = range.get('slug') === 'fine-dine-in'
      const view = this.getView(mobileGridView, isFeatured, isFineDineIn)

      index += 1

      return (
        <Recipe
          key={recipeId}
          id={recipeId}
          position={index}
          title={formatRecipeTitle(recipe.get('title'), recipe.get('boxType', ''), recipe.get('dietType', ''))}
          media={getFeaturedImage(recipe, view)}
          url={recipe.get('url')}
          useWithin={recipe.get('shelfLifeDays')}
          cookingTime={numPortions === 2 ? recipe.get('cookingTime') : recipe.get('cookingTimeFamily')}
          averageRating={recipe.getIn(['rating', 'average'])}
          ratingCount={recipe.getIn(['rating', 'count'])}
          chef={recipe.get('chef')}
          description={recipe.get('description')}
          availability={recipe.get('availability')}
          equipment={recipe.get('equipment')}
          view={view}
          cutoffDate={cutoffDate}
          onClick={() => { showDetailRecipe(recipeId) }}
          features={features}
          isRecommendedRecipe={isRecommendedRecipe(recipeId, allRecipesList, recipesStore)}
          range={range}
          tasteScore={recipe.getIn(['recommendationData', 'score'])}
          fiveADay={recipe.get('fiveADay')}
          diet={recipe.get('dietType')}
        />
      )
    })
    const cta = <Recipe key={'ctaAllRecipe'} view={'ctaAllRecipe'} collectionFilterChange={collectionFilterChange} />
    if (!!isCurrentCollectionRecommendation) {
      return newRecipeList.concat(cta).toArray()
    }

    return newRecipeList.toArray()
  }

  render() {
    const {
      mobileGridView,
    } = this.props
    const gridSizer = mobileGridView ? 'gridSizerMobile' : 'gridSizer'

    return (
      <Masonry
        className={classnames(mobileGridView ? css.gridMobile : css.grid)}
        elementType={'div'}
        options={{
          transitionDuration: 0,
          columnWidth: `.${gridSizer}`,
          itemSelector: '.grid',
          percentPosition: true,
          gutter: 15,
        }}
        disableImagesLoaded={false}
        ref={(c) => {
          if (c) {
            this.masonry = c.masonry
          }
        }}
      >
        <div className={classnames(css[gridSizer], gridSizer)} />
        <div className={classnames(css.gutterSizer, 'gutterSizer')} />
        {this.listOfRecipes()}
      </Masonry>
    )
  }
}

export default RecipeList
