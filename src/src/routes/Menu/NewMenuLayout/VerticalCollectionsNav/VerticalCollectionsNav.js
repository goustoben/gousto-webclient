import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import React from 'react'
import Immutable from 'immutable'
import CollectionItem from 'CollectionItem'
import css from './VerticalCollectionsNav.css'

const changeCollectionWithScrollToTop = (collectionFilterChange, collectionId) => {
  const headerHeight = 61
  if (window.scrollY >= headerHeight) {
    window.scrollTo(0,headerHeight)
  }
  collectionFilterChange(collectionId)
}

export const VerticalCollectionsNav = ({ menuCollections, menuCollectionRecipes, menuCurrentCollectionId, collectionFilterChange }) => (
  <div className={css.navBarContainer}>
    {menuCollections
      .map(collection => {
        const collectionId = collection.get('id')
        const collectionClass = (menuCurrentCollectionId === collectionId) ? css.currentItem : css.item
        const recipeCount = menuCollectionRecipes.get(collectionId, Immutable.List([])).size
        const collectionSlug = collection.get('slug')
        const collectionTitle = collection.get('shortTitle')

        return (
          <CollectionItem
            count={recipeCount}
            key={collectionId}
            dataId={collectionId}
            className={collectionClass}
            onClick={() => { changeCollectionWithScrollToTop(collectionFilterChange, collectionId) }}
            collectionId={collectionId}
            slug={collectionSlug}
          >
            <span className={css.itemTitle}>
              {collectionTitle}
            </span>
          </CollectionItem>
        )
      }).toArray()}
  </div>
)

VerticalCollectionsNav.propTypes = {
  menuCollections: ImmutablePropTypes.orderedMapOf(ImmutablePropTypes.mapContains({
    id: PropTypes.string,
    shortTitle: PropTypes.string,
    slug: PropTypes.string
  })).isRequired,
  menuCollectionRecipes: ImmutablePropTypes.mapOf(ImmutablePropTypes.listOf(PropTypes.string)).isRequired,
  collectionFilterChange: PropTypes.func.isRequired,
  menuCurrentCollectionId: PropTypes.string.isRequired,
}

