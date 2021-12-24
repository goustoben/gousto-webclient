import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { carousel } from 'config/home'
import { RecipeCarouselContainer } from './RecipeCarousel'
import { CTAHomepageContainer } from '../CTA'
import { ModuleTitle } from '../ModuleTitle'
import css from './Carousel.css'

const Carousel = ({ ctaUri, ctaText }) => (
  <Fragment>
    <div className={css.carouselContainer}>
      <ModuleTitle title={carousel.title} subTitle={carousel.subtitle} />
    </div>
    <RecipeCarouselContainer />
    <div className={css.CTAContainer}>
      <CTAHomepageContainer ctaUri={ctaUri} sectionForTracking="recipeCarousel">
        {ctaText}
      </CTAHomepageContainer>
    </div>
  </Fragment>
)

Carousel.propTypes = {
  ctaUri: PropTypes.string.isRequired,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

export { Carousel }
