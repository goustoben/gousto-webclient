import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import ModuleHeader from 'ModuleHeader'
import RecipeCarousel from './RecipeCarousel'
import CTAHomepage from '../CTA'

const Carousel = ({ redirect, numRecipes, ctaUri, ctaText }) => (
  <div>
    <ModuleHeader>Now, what looks good?</ModuleHeader>
    {numRecipes > 0 ? <RecipeCarousel /> : null}
    <CTAHomepage width={240} onClick={() => { redirect(ctaUri) }}>{ctaText}</CTAHomepage>
  </div>
)

Carousel.propTypes = {
  redirect: PropTypes.func,
  numRecipes: PropTypes.number,
  ctaUri: PropTypes.string,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

Carousel.defaultProps = {
  numRecipes: 0,
  ctaUri: config.client.menu,
  ctaText: home.CTA.main,
}

export default Carousel
