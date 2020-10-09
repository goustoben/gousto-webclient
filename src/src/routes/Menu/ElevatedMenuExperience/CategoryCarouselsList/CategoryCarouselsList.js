import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { CategoryCarouselContainer } from '../CategoryCarousel'
import css from './CategoryCarouselsList.css'

const CategoryCarouselsList = ({ categories }) => {
  if (!categories.size) return null
  const categoriesList = categories.toArray()

  return (
    <div className={css.categoryCarouselsList}>
      {categoriesList.map((category) => (
        <CategoryCarouselContainer key={category.get('id')} category={category} />
      ))}
    </div>
  )
}
CategoryCarouselsList.propTypes = {
  categories: PropTypes.instanceOf(Immutable.OrderedMap).isRequired,
}
export { CategoryCarouselsList }
