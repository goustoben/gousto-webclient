import React, { PropTypes } from 'react'
import Overlay from 'Overlay'
import Detail from 'Recipe/Detail'
import Immutable from 'immutable' /* eslint-disable new-cap */

import { getLowStockTag, getSurcharge } from 'utils/recipe'
import { getFeaturedImage, getRangeImages } from 'utils/image'

const DetailOverlay = ({ showOverlay, menuRecipeDetailShow, recipesStore, numPortions, stock }) => (
	<Overlay open={showOverlay}>
		{(() => {
			if (recipesStore) {
				const recipeId = menuRecipeDetailShow
				const detailRecipe = recipesStore.get(recipeId)
				if (menuRecipeDetailShow && detailRecipe) {
					const stockRecipe = stock.getIn([recipeId, String(numPortions)])
					const surcharge = getSurcharge(detailRecipe.get('meals'), numPortions)
					const IsFineDineIn = detailRecipe.get('range') === 'fine_dine_in'
					const view = (IsFineDineIn) ? 'fineDineInDetail' : 'detail'
					const images = (IsFineDineIn) ? getRangeImages(detailRecipe) : null

					return (
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
							range={detailRecipe.get('range', '')}
						/>
					)
				}
			}

			return null
		})()}
	</Overlay>
)

DetailOverlay.propTypes = {
 menuRecipeDetailShow: PropTypes.string,
 stock: PropTypes.instanceOf(Immutable.Map),
 numPortions: PropTypes.number.isRequired,
 recipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default DetailOverlay
