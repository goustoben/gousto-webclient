import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { CategoryCarouselContainer } from '../CategoryCarousel'
import css from './CategoryCarouselsList.css'

const CategoryCarouselsList = ({ categories }) => {
  if (!categories.size) return null

  return (
    <div className={css.categoryCarouselsList}>
      {categories.map((category) => (
        <CategoryCarouselContainer key={category.get('id')} category={category} />
      ))}
    </div>
  )
}
CategoryCarouselsList.propTypes = {
  categories: PropTypes.instanceOf(Immutable.OrderedMap).isRequired,
}

export { CategoryCarouselsList }
