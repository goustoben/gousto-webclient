import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { getSurcharge } from 'utils/recipe'
import { getFeaturedImage, getRangeImages } from 'utils/image'
import Modal from 'Modal'

import { DetailContainer } from '../Recipe/Detail'

const propTypes = {
  showOverlay: PropTypes.bool,
  menuRecipeDetailShow: PropTypes.string,
  chosenSideRecipeId: PropTypes.string,
  position: PropTypes.number,
  numPortions: PropTypes.number.isRequired,
  recipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  browserType: PropTypes.string.isRequired,
  isOutOfStock: PropTypes.bool.isRequired
}

const defaultProps = {
  showOverlay: false,
  menuRecipeDetailShow: '',
  chosenSideRecipeId: null,
  position: null
}

const DetailOverlay = ({ showOverlay, menuRecipeDetailShow, chosenSideRecipeId, recipesStore, numPortions, position, browserType, isOutOfStock }) => {
  const recipeId = menuRecipeDetailShow
  const detailRecipe = recipesStore.get(recipeId)

  const showDetailOverlay = (showOverlay && detailRecipe && menuRecipeDetailShow)

  if (!showDetailOverlay) {
    return (
      null
    )
  }

  const surcharge = getSurcharge(detailRecipe.get('meals'), numPortions)
  const isFineDineIn = detailRecipe.get('isFineDineIn')
  const view = isFineDineIn ? 'fineDineInDetail' : 'detail'
  const images = (isFineDineIn) ? getRangeImages(detailRecipe) : null
  const isChefPrepared = detailRecipe.get('chefPrepared') === true
  const media = isFineDineIn ? images : getFeaturedImage(detailRecipe, 'detail', browserType)

  return (
    <Modal isOpen={showOverlay}>
      <DetailContainer
        id={detailRecipe.get('id')}
        chosenSideRecipeId={chosenSideRecipeId}
        view={view}
        media={media}
        title={detailRecipe.get('title', '')}
        count={detailRecipe.getIn(['rating', 'count'], 0)}
        average={detailRecipe.getIn(['rating', 'average'], 0)}
        isOutOfStock={isOutOfStock}
        description={detailRecipe.get('description')}
        availability={detailRecipe.get('availability')}
        youWillNeed={detailRecipe.get('basics')}
        equipment={detailRecipe.get('equipment')}
        surcharge={surcharge}
        position={position}
        isChefPrepared={isChefPrepared}
        isFineDineIn={isFineDineIn}
      />
    </Modal>
  )
}

DetailOverlay.propTypes = propTypes
DetailOverlay.defaultProps = defaultProps

export { DetailOverlay }
