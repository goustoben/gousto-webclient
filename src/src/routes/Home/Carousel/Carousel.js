import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import { ModuleHeaderContainer } from 'ModuleHeader'
import { RecipeCarousel } from './RecipeCarousel'
import { CTAHomepageContainer } from '../CTA'

const Carousel = ({ numRecipes, ctaUri, ctaText }) => (
  <div>
    <ModuleHeaderContainer>Mmmmmm</ModuleHeaderContainer>
    {numRecipes > 0 ? <RecipeCarousel /> : null}
    <CTAHomepageContainer
      width={240}
      ctaUri={ctaUri}
      sectionForTracking="recipecarousel"
    >
      {ctaText}
    </CTAHomepageContainer>
  </div>
)

Carousel.propTypes = {
  numRecipes: PropTypes.number,
  ctaUri: PropTypes.string,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

Carousel.defaultProps = {
  numRecipes: 0,
  ctaUri: config.client.menu,
  ctaText: home.CTA.main,
}

export { Carousel }
