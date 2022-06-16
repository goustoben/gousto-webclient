import React from 'react'

import { CollectionsNavigation, CollectionsNavigationItem } from 'goustouicomponents'
import PropTypes from 'prop-types'

import { ALL_PRODUCTS_CATEGORY_ID } from 'routes/OrderConfirmation/constants/categories'

import { useProductNavBar } from '../../context/productsNavBarContext'

const propTypes = {
  categories: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      count: PropTypes.number,
    }),
  ).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
}

const getDefaultCategoryId = (categories) => {
  if (categories?.occasions) return categories.occasions.id

  return categories[ALL_PRODUCTS_CATEGORY_ID].id
}

const ProductsNavBar = ({ categories, onSelectCategory }) => {
  const defaultCategoryId = getDefaultCategoryId(categories)
  const productNavRef = useProductNavBar()

  return (
    <CollectionsNavigation ref={productNavRef}>
      {Object.keys(categories).map((categoryId) => {
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
      })}
    </CollectionsNavigation>
  )
}

ProductsNavBar.propTypes = propTypes

export { ProductsNavBar }
