import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Carousel from 'Carousel'
import { formatRecipeTitle } from 'utils/recipe'
import { SimpleRecipe } from '../SimpleRecipe'
import { Arrow } from '../CarouselArrow/CarouselArrow'
import css from './RecipeCarousel.css'
import { orderRecipes } from './orderRecipes'

const RecipeCarousel = ({ homeCarouselRecipes }) => (
  <div className={`homepageSlider ${css.container}`}>
    <Carousel
      dots={false}
      adaptiveHeight={false}
      speed={400}
      useCSS
      centerMode
      autoplay={false}
      slidesToShow={5}
      slidesToScroll={1}
      infinite
      arrows
      prevArrow={<Arrow side="arrowLeft" />}
      nextArrow={<Arrow side="arrowRight" />}
      focusOnSelect
      swipeToSlide
      responsive={[
        { breakpoint: 516, settings: { slidesToShow: 1 } },
        { breakpoint: 703, settings: { slidesToShow: 2 } },
        { breakpoint: 1199, settings: { slidesToShow: 3 } },
        { breakpoint: 1600, settings: { slidesToShow: 5 } },
      ]}
      lazyLoad
    >
      {orderRecipes(homeCarouselRecipes)
        .map((recipe) => (
          <div className={css.recipeContainer} key={recipe.get('id')}>
            <div className={css.recipe} key={recipe.get('id')}>
              <SimpleRecipe
                title={formatRecipeTitle(
                  recipe.get('title'),
                  recipe.get('boxType', ''),
                  recipe.get('dietType', ''),
                )}
                media={recipe.getIn(['media', 'images', 0, 'urls'], Immutable.List([]))}
                averageRating={recipe.getIn(['rating', 'average']) || 0}
                ratingCount={recipe.getIn(['rating', 'count'])}
                maxMediaSize={400}
                cookingTime={recipe.get('cookingTime')}
              />
            </div>
          </div>
        ))
        .toArray()}
    </Carousel>
  </div>
)

RecipeCarousel.propTypes = {
  homeCarouselRecipes: PropTypes.instanceOf(Immutable.OrderedMap).isRequired,
}

Arrow.propTypes = {
  side: PropTypes.string.isRequired,
}

export { RecipeCarousel }
