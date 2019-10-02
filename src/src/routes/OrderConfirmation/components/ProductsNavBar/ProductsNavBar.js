import React from 'react'
import PropTypes from 'prop-types'
import { CollectionsNavigation, CollectionsNavigationItem } from 'goustouicomponents'

const propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
}

const ProductsNavBar = ({ categories, onSelectCategory }) => (
  <CollectionsNavigation>
    {
      categories.map(({ id, label }) => (
        <CollectionsNavigationItem
          key={id}
          isActive={!!(id === 'all-products')}
          onClick={() => onSelectCategory(id)}
        >
          {label}
        </CollectionsNavigationItem>
      ))
    }
  </CollectionsNavigation>
)

ProductsNavBar.propTypes = propTypes

export { ProductsNavBar }
