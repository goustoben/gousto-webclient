import React from 'react'
import PropTypes from 'prop-types'
import {
  ALL_RECIPES_COLLECTION_ID,
  VEGETARIAN_COLLECTION_ID,
  ALL_RECIPES_SHORT_NAME,
  DIETARY_REQUIREMENTS_SHORT_NAME
} from 'config/collections'
import css from './CategoriesShortcuts.css'
import { CategoriesThumbnailContainer } from '../CategoriesThumbnail'

const CategoriesShortcuts = ({ collectionFilterChange, showCategoriesModal, categoryShortcutClicked, push }) => (
  <div>
    <div className={css.shortcutsWrapper}>
      <div className={css.smallButtons}>
        <button
          type="button"
          className={css.smallShortcut}
          onClick={() => {
            collectionFilterChange(ALL_RECIPES_COLLECTION_ID)
            categoryShortcutClicked({ shortcutName: ALL_RECIPES_SHORT_NAME })
          }}
        >
          <CategoriesThumbnailContainer collectionId={ALL_RECIPES_COLLECTION_ID} />
          <span className={css.title}>All recipes</span>
        </button>
        <button
          type="button"
          className={css.smallShortcut}
          onClick={() => {
            categoryShortcutClicked({ shortcutName: DIETARY_REQUIREMENTS_SHORT_NAME })
            push('/menu/dietary-requirements')
          }}
        >
          <CategoriesThumbnailContainer collectionId={VEGETARIAN_COLLECTION_ID} />
          <span className={css.title}>Dietary requirements</span>
        </button>
      </div>
      <button type="button" onClick={showCategoriesModal} className={css.recipeCategoriesButton}>
        View recipe categories
      </button>
    </div>
  </div>
)

CategoriesShortcuts.propTypes = {
  collectionFilterChange: PropTypes.func,
  showCategoriesModal: PropTypes.func,
  categoryShortcutClicked: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
}

CategoriesShortcuts.defaultProps = {
  collectionFilterChange: () => {},
  showCategoriesModal: () => {},
}

export { CategoriesShortcuts }
