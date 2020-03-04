import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Carousel from 'Carousel'
import { formatRecipeTitle } from 'utils/recipe'
import { SimpleRecipe } from '../SimpleRecipe'
import css from './RecipeCarousel.css'
import orderRecipes from './orderRecipes'

const RecipeCarousel = ({ homeCarouselRecipes }) => (
  <div className={`homepageSlider ${css.container}`}>
    <Carousel
      dots={false}
      adaptiveHeight={false}
      speed={400}
      useCSS
      autoplay={false}
      slidesToShow={5}
      slidesToScroll={1}
      centerMode
      infinite
      focusOnSelect
      swipeToSlide
      responsive={[
        { breakpoint: 400, settings: { slidesToShow: 1, centerPadding: '50px' } },
        { breakpoint: 480, settings: { slidesToShow: 1, centerPadding: '80px' } },
        { breakpoint: 520, settings: { slidesToShow: 1, centerPadding: '120px' } },
        { breakpoint: 670, settings: { slidesToShow: 1, centerPadding: '160px' } },
        { breakpoint: 769, settings: { slidesToShow: 3, centerPadding: '20px' } },
        { breakpoint: 1281, settings: { slidesToShow: 3 } },
        { breakpoint: 2000, settings: { slidesToShow: 5 } },
        { breakpoint: 3000, settings: { slidesToShow: 7 } },
      ]}
    >
      {
        orderRecipes(homeCarouselRecipes)
          .map(recipe => (
            <div className={css.recipeContainer} key={recipe.get('id')}>
              <div className={css.recipe} key={recipe.get('id')}>
                <SimpleRecipe
                  title={formatRecipeTitle(recipe.get('title'), recipe.get('boxType', ''), recipe.get('dietType', ''))}
                  media={recipe.getIn(['media', 'images', 0, 'urls'], Immutable.List([]))}
                  averageRating={recipe.getIn(['rating', 'average'])}
                  ratingCount={recipe.getIn(['rating', 'count'])}
                  maxMediaSize={400}
                />
              </div>
            </div>
          )).toArray()
      }
    </Carousel>
  </div>
)

RecipeCarousel.propTypes = {
  homeCarouselRecipes: PropTypes.instanceOf(Immutable.OrderedMap),
}

export default RecipeCarousel
