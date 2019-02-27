import React from 'react'
import PropTypes from 'prop-types'
import Overlay from 'Overlay'
import Detail from 'Recipe/Detail'
import Immutable from 'immutable'

import { getLowStockTag, getSurcharge, getTaxonomyTags, getRecipeRange } from 'utils/recipe'
import { getFeaturedImage, getRangeImages } from 'utils/image'

const propTypes = {
  showOverlay: PropTypes.bool,
  menuRecipeDetailShow: PropTypes.string,
  stock: PropTypes.instanceOf(Immutable.Map),
  numPortions: PropTypes.number.isRequired,
  recipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  position: PropTypes.number,
}

const DetailOverlay = ({ showOverlay, menuRecipeDetailShow, recipesStore, numPortions, stock, position }) => {

  const recipeId = menuRecipeDetailShow
  const detailRecipe = recipesStore.get(recipeId)
  let stockRecipe
  let surcharge
  let IsFineDineIn
  let view
  let images
  let range
  let dairyFree = false
  let glutenFree = false

  if (menuRecipeDetailShow && detailRecipe) {
    stockRecipe = stock.getIn([recipeId, String(numPortions)])
    surcharge = getSurcharge(detailRecipe.get('meals'), numPortions)
    range = getRecipeRange(detailRecipe)
    IsFineDineIn = range.size && range.get('slug') === 'fine-dine-in'
    view = (IsFineDineIn) ? 'fineDineInDetail' : 'detail'
    images = (IsFineDineIn) ? getRangeImages(detailRecipe) : null

    getTaxonomyTags(detailRecipe, 'dietary-attributes').map((tag) => {
      if (tag.get('slug') == 'gluten-free') glutenFree = true
      if (tag.get('slug') == 'dairy-free') dairyFree = true
    })
  }

  return (
    <Overlay open={showOverlay}>
      {
        (showOverlay && detailRecipe && menuRecipeDetailShow) ? (
          <Detail
            view={view}
            tag={getLowStockTag(stockRecipe, detailRecipe.getIn(['rating', 'count']))}
            media={getFeaturedImage(detailRecipe, 'detail')}
            images={images}
            title={detailRecipe.get('title', '')}
            count={detailRecipe.getIn(['rating', 'count'], 0)}
            average={detailRecipe.getIn(['rating', 'average'], 0)}
            perPortion={detailRecipe.getIn(['nutritionalInformation', 'perPortion'], Immutable.Map({}))}
            per100Grams={detailRecipe.getIn(['nutritionalInformation', 'per100g'], Immutable.Map({}))}
            ingredients={detailRecipe.get('ingredients', Immutable.List([]))}
            allergens={detailRecipe.get('allergens', Immutable.List([]))}
            id={detailRecipe.get('id')}
            recipeId={recipeId}
            stock={stockRecipe}
            useWithin={detailRecipe.get('shelfLifeDays')}
            cookingTime={numPortions === 2 ? detailRecipe.get('cookingTime') : detailRecipe.get('cookingTimeFamily')}
            description={detailRecipe.get('description')}
            availability={detailRecipe.get('availability')}
            youWillNeed={detailRecipe.get('basics')}
            cuisine={detailRecipe.get('cuisine')}
            diet={detailRecipe.get('dietType')}
            equipment={detailRecipe.get('equipment')}
            surcharge={surcharge}
            range={getRecipeRange(detailRecipe)}
            fiveADay={detailRecipe.get('fiveADay')}
            glutenFree={glutenFree}
            dairyFree={dairyFree}
            position={position}
          />
        )
          : null
      }
    </Overlay>
  )
}

DetailOverlay.propTypes = propTypes

export default DetailOverlay
