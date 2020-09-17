import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import ModalComponent, { ModalTitle, ModalContent, ModalFooter } from 'ModalComponent'
import { CategoriesThumbnailContainer } from '../CategoriesThumbnail'
import css from './CategoriesModal.css'

export const CategoriesModal = ({
  showCategoriesModal,
  hideCategoriesModal,
  menuCollections,
  collectionFilterChange,

}) => {
  const onCloseClick = () => {
    hideCategoriesModal()
  }

  return (
    <ModalComponent visible={showCategoriesModal} styleName={css.categoriesModal}>
      <ModalTitle className={css.categoriesModalTitleWrapper}>
        <h1 className={css.categoriesModalTitle}>
          Recipe Categories
        </h1>
        <button type="button" className={css.categoriesModalCloseX} onClick={onCloseClick} />
      </ModalTitle>
      <ModalContent className={css.categoriesModalContent}>
        {menuCollections
          .map(collection => {
            const collectionId = collection.get('id')
            const recipeCount = collection.get('recipesInCollection').size

            return (
              <div
                role="button"
                tabIndex={-1}
                key={collectionId}
                className={css.categoriesTitleWrapper}
                onClick={
                  () => {
                    onCloseClick()
                    collectionFilterChange(collectionId)
                  }
                }
                onKeyPress={() => {
                  onCloseClick()
                  collectionFilterChange(collectionId)
                }}
              >
                <CategoriesThumbnailContainer collectionId={collectionId} />
                <span className={css.categoryTitle}>
                  {collection.get('shortTitle')}
                </span>
                <span className={css.recipeCount}>{recipeCount}</span>
              </div>
            )
          })
          .toArray()}
      </ModalContent>

      <ModalFooter className={css.categoriesModalFooter}>
        <button
          className={css.categoriesModalBackToMenuButton}
          type="button"
          onClick={onCloseClick}
        >
          Back to menu
        </button>
      </ModalFooter>
    </ModalComponent>
  )
}

CategoriesModal.propTypes = {
  showCategoriesModal: PropTypes.bool.isRequired,
  hideCategoriesModal: PropTypes.func.isRequired,
  menuCollections: PropTypes.instanceOf(Immutable.OrderedMap).isRequired,
  collectionFilterChange: PropTypes.func,
}

CategoriesModal.defaultProps = {
  collectionFilterChange: () => {},
}
