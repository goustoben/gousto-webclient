import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getSurcharge } from 'utils/recipe'
import { getFeaturedImage, getRangeImages } from 'utils/image'
import Modal from 'Modal'

import {
  getMenuRecipeIdForDetails,
  getMenuRecipeReferenceForDetails,
} from '../../../selectors/menuRecipeDetails'
import { getBrowserType } from '../../../../../selectors/browser'
import { getRecipePosition } from '../../../../../selectors/collections'
import { getNumPortions } from '../../../../../selectors/basket'
import { getRecipes } from '../../../../../selectors/root'

import { DetailContainer } from '../DetailContainer'
import { EscapeKeyPressed } from '../../../../../utils/DOMEvents'
import { RecipeContextProvider } from '../../../context/recipeContext'
import { RecipeReferenceProvider } from '../../../context/recipeReferenceContext'
import { closeRecipeDetails } from '../../../actions/closeRecipeDetails'

interface DetailOverlayProps {
  showOverlay?: boolean
}

const DetailOverlay = ({ showOverlay: showOverlayProp }: DetailOverlayProps) => {
  const showOverlay = Boolean(useSelector(getMenuRecipeIdForDetails)) && showOverlayProp
  const recipeId = useSelector(getMenuRecipeIdForDetails)
  const recipeReference = useSelector(getMenuRecipeReferenceForDetails)
  const menuRecipeDetailShow = recipeId || ''
  const position = useSelector((state) => getRecipePosition(state, recipeId)) || null
  const browserType = useSelector(getBrowserType)
  const recipesStore = useSelector(getRecipes)
  const numPortions = useSelector(getNumPortions)
  const detailRecipe = recipesStore.get(menuRecipeDetailShow)
  const dispatch = useDispatch()
  const onClose = useCallback(() => dispatch(closeRecipeDetails()), [dispatch])
  const browserBack = useCallback(() => window.history.back(), [])

  /**
   * Close overlay on Escape button
   */
  useEffect(() => {
    const closeOverlay = (e: KeyboardEventInit): void => {
      if (showOverlay && EscapeKeyPressed(e)) {
        onClose()
      }
    }
    document.addEventListener('keyup', closeOverlay, false)

    return () => {
      document.removeEventListener('keyup', closeOverlay, false)
    }
  }, [onClose, showOverlay])

  if (!(showOverlay && detailRecipe && menuRecipeDetailShow)) {
    return null
  }
  const surcharge = getSurcharge(detailRecipe.get('meals'), numPortions)
  const isFineDineIn = detailRecipe.get('isFineDineIn')
  const view = isFineDineIn ? 'fineDineInDetail' : 'detail'
  const rangeImages = getRangeImages(detailRecipe)
  const images = isFineDineIn ? rangeImages : null
  const featuredImage = getFeaturedImage(detailRecipe, 'detail', browserType)
  const media = isFineDineIn ? images : featuredImage

  return (
    <Modal isOpen={showOverlay} onBackCallback={onClose}>
      <RecipeReferenceProvider value={recipeReference}>
        <RecipeContextProvider value={detailRecipe}>
          <DetailContainer
            id={detailRecipe.get('id')}
            view={view}
            media={media}
            title={detailRecipe.get('title', '')}
            count={detailRecipe.getIn(['rating', 'count'], 0)}
            average={detailRecipe.getIn(['rating', 'average'], 0)}
            description={detailRecipe.get('description')}
            youWillNeed={detailRecipe.get('basics')}
            equipment={detailRecipe.get('equipment')}
            surcharge={surcharge}
            position={position}
            isFineDineIn={isFineDineIn}
            onClose={browserBack}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            availability={detailRecipe.get('availability')}
          />
        </RecipeContextProvider>
      </RecipeReferenceProvider>
    </Modal>
  )
}

DetailOverlay.propTypes = {
  showOverlay: PropTypes.bool,
}

DetailOverlay.defaultProps = {
  showOverlay: false,
}

export { DetailOverlay }
