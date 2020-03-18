import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import ModuleHeader from 'ModuleHeader'
import { RecipeCarousel } from './RecipeCarousel'
import CTAHomepage from '../CTA'

const Carousel = ({ redirect, numRecipes, ctaUri, ctaText, trackGetStarted }) => (
  <div>
    <ModuleHeader>Mmmmmm</ModuleHeader>
    {numRecipes > 0 ? <RecipeCarousel /> : null}
    <CTAHomepage
      width={240}
      onClick={() => {
        redirect(ctaUri)
        trackGetStarted('recipecarousel')
      }}
    >
      {ctaText}
    </CTAHomepage>
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
