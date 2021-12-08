import React from 'react'
import PropTypes from 'prop-types'
import css from './RecipeCard.stories.css'
import { RecipeCard } from './RecipeCard.logic'

const cards = [
  {
    title: 'Caponata',
    cookingTime: 35,
    rating: { amountOfReviews: 598, average: 4, size: 'Medium' },
    media: [
      {
        url:
          'https://production-media.gousto.co.uk/cms/mood-image/382.Caponata-x400.jpg',
        width: 400,
      },
    ],
  },
  {
    title: 'Chicken Peperonata & Cheesy Potatoes',
    cookingTime: 35,
    rating: { amountOfReviews: 4025, average: 4.5, size: 'Medium' },
    media: [
      {
        url:
          'https://production-media.gousto.co.uk/cms/mood-image/1188-Chicken-Peperonata--Cheesy-Potatoes.new-x400.jpg',
        width: 400,
      },
    ],
  },
  {
    title: 'Root Vegetable & Toasted Cashew Curry',
    cookingTime: 30,
    rating: { amountOfReviews: 835, average: 4.5, size: 'Medium' },
    media: [
      {
        url:
          'https://production-media.gousto.co.uk/cms/mood-image/32.Root-VegetableCurryV-x400.jpg',
        width: 400,
      },
    ],
  },
  {
    title:
      'Duck Breast, Orange Sauce, Duck-Fat Roasted Potatoes & Baby Red Chard',
    cookingTime: 45,
    rating: { amountOfReviews: 519, average: 4.5, size: 'Medium' },
    media: [
      {
        url:
          'https://production-media.gousto.co.uk/cms/mood-image/1556-Duck-Breast-Orange-Sauce-Duck-Fat-Roasted-Potatoes--Baby-Red-Chard.2-x400.jpg',
        width: 400,
      },
    ],
  },
]

export const MultipleCardsStory = ({ nCards }) => (
  <ul className={css.container}>
    {cards.slice(0, nCards).map(({
      title, cookingTime, rating, media,
    }) => (
      <li key={title}>
        <a href="/">
          <RecipeCard
            hasHoverEffect
            isResizable
            title={title}
            cookingTime={cookingTime}
            rating={rating}
            media={media}
            hasRectangularImageOnMobile
            hasMargin={false}
            fitHeight
          />
        </a>
      </li>
    ))}
  </ul>
)

MultipleCardsStory.propTypes = {
  nCards: PropTypes.number.isRequired,
}
