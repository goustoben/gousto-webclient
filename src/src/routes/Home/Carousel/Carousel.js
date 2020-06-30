import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import { ModuleHeaderContainer } from 'ModuleHeader'
import { RecipeCarousel } from './RecipeCarousel'
import { CTAHomepageContainer } from '../CTA'

const Carousel = ({ redirect, numRecipes, ctaUri, ctaText, trackGetStarted }) => (
  <div>
    <ModuleHeaderContainer>Mmmmmm</ModuleHeaderContainer>
    {numRecipes > 0 ? <RecipeCarousel /> : null}
    <CTAHomepageContainer
      width={240}
      onClick={() => {
        redirect(ctaUri)
        trackGetStarted('recipecarousel')
      }}
    >
      {ctaText}
    </CTAHomepageContainer>
  </div>
)

Carousel.propTypes = {
  redirect: PropTypes.func,
  numRecipes: PropTypes.number,
  ctaUri: PropTypes.string,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  trackGetStarted: PropTypes.func,
}

Carousel.defaultProps = {
  numRecipes: 0,
  ctaUri: config.client.menu,
  ctaText: home.CTA.main,
  redirect: () => {},
  trackGetStarted: () => {}
}

export { Carousel }
