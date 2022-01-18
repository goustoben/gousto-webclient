import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getSurcharge } from 'utils/recipe'
import { getFeaturedImage, getRangeImages } from 'utils/image'
import Modal from 'Modal'

import { getMenuRecipeIdForDetails } from '../selectors/menuRecipeDetails'
import { getBrowserType } from '../../../selectors/browser'
import { getRecipePosition } from '../../../selectors/collections'
import { getIsBackClosesModalEnabled } from '../../../selectors/features'
import { getNumPortions } from '../../../selectors/basket'
import { getRecipes } from '../../../selectors/root'

import { DetailContainer } from '../Recipe/Detail'
import { EscapeKeyPressed } from '../../../utils/DOMEvents'
import { RecipeContextProvider } from '../context/recipeContext'
import { closeRecipeDetails } from '../actions/closeRecipeDetails'

interface DetailOverlayProps {
  showOverlay?: boolean
  isFromShowcaseMenu?: boolean
}

const DetailOverlay = ({
  showOverlay: showOverlayProp,
  isFromShowcaseMenu,
}: DetailOverlayProps) => {
  const showOverlay = Boolean(useSelector(getMenuRecipeIdForDetails)) && showOverlayProp
  const recipeId = useSelector(getMenuRecipeIdForDetails)
  const menuRecipeDetailShow = recipeId || ''
  const position = useSelector(state => getRecipePosition(state, recipeId)) || null
  const browserType = useSelector(getBrowserType)
  const isBackClosesModalEnabled = useSelector(getIsBackClosesModalEnabled)
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
  const isChefPrepared = detailRecipe.get('chefPrepared') === true
  const featuredImage = getFeaturedImage(detailRecipe, 'detail', browserType)
  const media = isFineDineIn ? images : featuredImage

  return (
    <Modal
      isOpen={showOverlay}
      onBackCallback={
        isBackClosesModalEnabled
          ? onClose
          : null
      }
    >
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
          isChefPrepared={isChefPrepared}
          isFineDineIn={isFineDineIn}
          isFromShowcaseMenu={isFromShowcaseMenu}
          onClose={isBackClosesModalEnabled ? browserBack : onClose}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          availability={detailRecipe.get('availability')}
        />
      </RecipeContextProvider>
    </Modal>
  )
}

DetailOverlay.propTypes = {
  showOverlay: PropTypes.bool,
  isFromShowcaseMenu: PropTypes.bool,
}

DetailOverlay.defaultProps = {
  showOverlay: false,
  isFromShowcaseMenu: false,
}

export { DetailOverlay }
