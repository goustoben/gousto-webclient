import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { getSurcharge } from 'utils/recipe'
import { getFeaturedImage, getRangeImages } from 'utils/image'
import Modal from 'Modal'

import { DetailContainer } from '../Recipe/Detail'
import { EscapeKeyPressed } from '../../../utils/DOMEvents'
import { isWindowDefined } from '../../../utils/window'
import { RecipeContextProvider } from '../context/recipeContext'

const propTypes = {
  showOverlay: PropTypes.bool,
  menuRecipeDetailShow: PropTypes.string,
  chosenSideRecipeId: PropTypes.string,
  position: PropTypes.number,
  numPortions: PropTypes.number.isRequired,
  recipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  browserType: PropTypes.string.isRequired,
  isOutOfStock: PropTypes.bool.isRequired,
  onCloseOverlay: PropTypes.func.isRequired,
  isFromShowcaseMenu: PropTypes.bool,
}

const defaultProps = {
  showOverlay: false,
  menuRecipeDetailShow: '',
  chosenSideRecipeId: null,
  position: null,
  isFromShowcaseMenu: false,
}

class DetailOverlay extends PureComponent {
  componentDidMount() {
    this.handleShowOverlay()
  }

  componentDidUpdate(prevProps) {
    const { showOverlay } = this.props

    if (prevProps.showOverlay !== showOverlay) {
      this.handleShowOverlay()
    }
  }

  componentWillUnmount() {
    this.removeHandleCloseOverlay()
  }

  handleCloseOverlay = (e) => {
    const { onCloseOverlay } = this.props

    if (EscapeKeyPressed(e)) {
      onCloseOverlay()
    }
  }

  handleShowOverlay() {
    const { showOverlay } = this.props

    if (showOverlay) {
      this.addHandleCloseOverlay()
    } else {
      this.removeHandleCloseOverlay()
    }
  }

  addHandleCloseOverlay() {
    if (isWindowDefined()) {
      window.document.addEventListener('keyup', this.handleCloseOverlay, false)
    }
  }

  removeHandleCloseOverlay() {
    if (isWindowDefined()) {
      window.document.removeEventListener('keyup', this.handleCloseOverlay, false)
    }
  }

  render() {
    const { showOverlay, menuRecipeDetailShow, chosenSideRecipeId, recipesStore, numPortions, position, browserType, isOutOfStock, isFromShowcaseMenu } = this.props
    const recipeId = menuRecipeDetailShow
    const detailRecipe = recipesStore.get(recipeId)

    const showDetailOverlay = (showOverlay && detailRecipe && menuRecipeDetailShow)

    if (!showDetailOverlay) {
      return null
    }

    const surcharge = getSurcharge(detailRecipe.get('meals'), numPortions)
    const isFineDineIn = detailRecipe.get('isFineDineIn')
    const view = isFineDineIn ? 'fineDineInDetail' : 'detail'
    const images = (isFineDineIn) ? getRangeImages(detailRecipe) : null
    const isChefPrepared = detailRecipe.get('chefPrepared') === true
    const media = isFineDineIn ? images : getFeaturedImage(detailRecipe, 'detail', browserType)

    return (
      <Modal isOpen={showOverlay}>
        <RecipeContextProvider value={detailRecipe}>
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
            isFromShowcaseMenu={isFromShowcaseMenu}
          />
        </RecipeContextProvider>
      </Modal>
    )
  }
}

DetailOverlay.propTypes = propTypes
DetailOverlay.defaultProps = defaultProps

export { DetailOverlay }
