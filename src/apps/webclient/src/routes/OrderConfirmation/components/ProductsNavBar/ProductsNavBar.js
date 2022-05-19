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

const getDefaultCategoryId = (categories) => {
  if (categories?.occasions) return categories.occasions.id
  if (categories?.pairings) return categories.pairings.id

  return categories['all-products'].id
}

const ProductsNavBar = ({ categories, onSelectCategory }) => {
  const defaultCategoryId = getDefaultCategoryId(categories)

  return (
    <CollectionsNavigation>
      {
        Object.keys(categories).map((categoryId) => {
          const { id, label, count } = categories[categoryId]

          return (
            <CollectionsNavigationItem
              key={id}
              isActive={id === defaultCategoryId}
              onClick={() => onSelectCategory(id)}
            >
              {`${label} (${count})`}
            </CollectionsNavigationItem>
          )
        })
      }
    </CollectionsNavigation>
  )
}

ProductsNavBar.propTypes = propTypes

export { ProductsNavBar }
