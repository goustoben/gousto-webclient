import React from 'react'
import PropTypes from 'prop-types'
import { CollectionsNavigation, CollectionsNavigationItem } from 'goustouicomponents'

const propTypes = {
  categories: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    count: PropTypes.number,
  })).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
}

const ProductsNavBar = ({ categories, onSelectCategory }) => (
  <CollectionsNavigation>
    {
      Object.keys(categories).map(categoryId => {
        const { id, label, count } = categories[categoryId]

        return (
          <CollectionsNavigationItem
            key={id}
            isActive={!!(id === 'all-products')}
            onClick={() => onSelectCategory(id)}
          >
            {`${label} (${count})`}
          </CollectionsNavigationItem>
        )
      })
    }
  </CollectionsNavigation>
)

ProductsNavBar.propTypes = propTypes

export { ProductsNavBar }
