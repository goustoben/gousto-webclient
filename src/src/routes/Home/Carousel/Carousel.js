import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { carousel } from 'config/home'
import { RecipeCarousel } from './RecipeCarousel'
import { CTAHomepageContainer } from '../CTA'
import { ModuleTitle } from '../ModuleTitle'
import css from './Carousel.css'

const Carousel = ({ numRecipes, ctaUri, ctaText, isCarouselShiftEnabled }) => (
  <div
    className={classNames(css.carouselContainer, {
      [css.carouselShiftContainer]: isCarouselShiftEnabled,
    })}
  >
    <div className={css.titlePadding}>
      <ModuleTitle
        title={carousel.title}
        subTitle={carousel.subtitle}
        color={isCarouselShiftEnabled ? 'white' : 'grey'}
      />
    </div>
    {numRecipes > 0 ? <RecipeCarousel /> : null}
    <div className={css.CTAContainer}>
      <CTAHomepageContainer ctaUri={ctaUri} sectionForTracking="recipeCarousel">
        {ctaText}
      </CTAHomepageContainer>
    </div>
  </div>
)

Carousel.propTypes = {
  numRecipes: PropTypes.number,
  ctaUri: PropTypes.string.isRequired,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isCarouselShiftEnabled: PropTypes.bool,
}

Carousel.defaultProps = {
  numRecipes: 0,
  isCarouselShiftEnabled: false,
}

export { Carousel }
