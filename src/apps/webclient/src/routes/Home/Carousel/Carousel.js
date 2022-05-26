import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import { carousel } from 'config/home'

import { CTAHomepageContainer } from '../CTA'
import { ModuleTitle } from '../ModuleTitle'
import { RecipeCarousel } from './RecipeCarousel'

import css from './Carousel.css'

const Carousel = ({ numRecipes, ctaUri, ctaText }) => (
  <Fragment>
    <div className={css.carouselContainer}>
      <ModuleTitle title={carousel.title} subTitle={carousel.subtitle} />
    </div>
    {numRecipes > 0 ? <RecipeCarousel /> : null}
    <div className={css.CTAContainer}>
      <CTAHomepageContainer ctaUri={ctaUri} sectionForTracking="recipeCarousel">
        {ctaText}
      </CTAHomepageContainer>
    </div>
  </Fragment>
)

Carousel.propTypes = {
  numRecipes: PropTypes.number,
  ctaUri: PropTypes.string.isRequired,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

Carousel.defaultProps = {
  numRecipes: 0,
}

export { Carousel }
