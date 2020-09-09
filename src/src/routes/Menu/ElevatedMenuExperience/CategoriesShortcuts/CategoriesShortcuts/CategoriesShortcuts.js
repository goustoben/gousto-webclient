import React from 'react'
import PropTypes from 'prop-types'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import css from './CategoriesShortcuts.css'

const CategoriesShortcuts = ({ collectionFilterChange, showCategoriesModal }) => (
  <div>
    <div className={css.shortcutsWrapper}>
      <div className={css.smallButtons}>
        <button type="button" className={css.smallShortcut} onClick={() => collectionFilterChange(ALL_RECIPES_COLLECTION_ID)}>
          All recipes
        </button>
        <button type="button" className={css.smallShortcut}>
          Dietary requirements
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
  showCategoriesModal: PropTypes.func
}

CategoriesShortcuts.defaultProps = {
  collectionFilterChange: () => {},
  showCategoriesModal: () => {}
}

export { CategoriesShortcuts }
