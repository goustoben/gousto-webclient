import React from 'react'
import PropTypes from 'prop-types'
import { DetailContainer } from 'routes/Menu/Recipe/Detail'
import Immutable from 'immutable'

import { getLowStockTag, getSurcharge, getTaxonomyTags } from 'utils/recipe'
import { getFeaturedImage, getRangeImages } from 'utils/image'
import Modal from 'Modal'

const propTypes = {
  showOverlay: PropTypes.bool,
  menuRecipeDetailShow: PropTypes.string,
  position: PropTypes.number,
  stock: PropTypes.instanceOf(Immutable.Map).isRequired,
  numPortions: PropTypes.number.isRequired,
  recipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  browserType: PropTypes.string.isRequired,
  outOfStock: PropTypes.bool.isRequired
}

const defaultProps = {
  showOverlay: false,
  menuRecipeDetailShow: '',
  position: null
}

const DetailOverlay = ({ showOverlay, menuRecipeDetailShow, recipesStore, numPortions, stock, position, browserType, outOfStock }) => {
  const recipeId = menuRecipeDetailShow
  const detailRecipe = recipesStore.get(recipeId)

  const showDetailOverlay = (showOverlay && detailRecipe && menuRecipeDetailShow)

  if (!showDetailOverlay) {
    return (
      null
    )
  }

  const dietaryTagSlugs = getTaxonomyTags(detailRecipe, 'dietary-attributes').map(tag => tag.get('slug'))
  const dairyFree = dietaryTagSlugs.some(slug => slug === 'dairy-free')
  const glutenFree = dietaryTagSlugs.some(slug => slug === 'gluten-free')

  const stockRecipe = stock.getIn([recipeId, String(numPortions)], 0)
  const surcharge = getSurcharge(detailRecipe.get('meals'), numPortions)
  const isFineDineIn = detailRecipe.get('isFineDineIn')
  const view = isFineDineIn ? 'fineDineInDetail' : 'detail'
  const images = (isFineDineIn) ? getRangeImages(detailRecipe) : null
  const isChefPrepared = detailRecipe.get('chefPrepared') === true
  const media = isFineDineIn ? images : getFeaturedImage(detailRecipe, 'detail', browserType)

  return (
    <Modal isOpen={showOverlay}>
      <DetailContainer
        view={view}
        tag={getLowStockTag(stockRecipe, detailRecipe.getIn(['rating', 'count']))}
        media={media}
        title={detailRecipe.get('title', '')}
        count={detailRecipe.getIn(['rating', 'count'], 0)}
        average={detailRecipe.getIn(['rating', 'average'], 0)}
        perPortion={detailRecipe.getIn(['nutritionalInformation', 'perPortion'], Immutable.Map({}))}
        per100Grams={detailRecipe.getIn(['nutritionalInformation', 'per100g'], Immutable.Map({}))}
        ingredients={detailRecipe.get('ingredients', Immutable.List([]))}
        allergens={detailRecipe.get('allergens', Immutable.List([]))}
        id={detailRecipe.get('id')}
        recipeId={recipeId}
        outOfStock={outOfStock}
        useWithin={detailRecipe.get('shelfLifeDays')}
        cookingTime={numPortions === 2 ? detailRecipe.get('cookingTime') : detailRecipe.get('cookingTimeFamily')}
        description={detailRecipe.get('description')}
        availability={detailRecipe.get('availability')}
        youWillNeed={detailRecipe.get('basics')}
        cuisine={detailRecipe.get('cuisine')}
        diet={detailRecipe.get('dietType')}
        equipment={detailRecipe.get('equipment')}
        surcharge={surcharge}
        fiveADay={detailRecipe.get('fiveADay')}
        glutenFree={glutenFree}
        dairyFree={dairyFree}
        position={position}
        isChefPrepared={isChefPrepared}
        numPortions={numPortions}
        isFineDineIn={isFineDineIn}
      />
    </Modal>
  )
}

DetailOverlay.propTypes = propTypes
DetailOverlay.defaultProps = defaultProps

export { DetailOverlay }
