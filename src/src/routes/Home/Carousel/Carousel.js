import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import { ModuleHeaderContainer } from 'ModuleHeader'
import { Heading } from 'goustouicomponents'
import { RecipeCarousel } from './RecipeCarousel'
import { CTAHomepageContainer } from '../CTA'
import css from './RedesignCarousel.css'

const Carousel = ({ numRecipes, ctaUri, ctaText, isHomePageRedesignEnabled }) => {
  if (isHomePageRedesignEnabled) {
    return (
      <div>
        <div className={css.carouselContainer}>
          <div className={css.title}>
            <Heading hasMargin={false} type="h1" size="fontStyle2XL">Who says Tuesday can’t taste like Saturday?</Heading>
          </div>
          <div className={css.carouselSubTitle}>
            <p className={css.subTitle}>
              Explore our wide range of cuisines and flavours. Whether it’s date night, family meal or a special occasion, we’ve got you covered!
            </p>
          </div>
        </div>
        {numRecipes > 0 ? <RecipeCarousel isHomePageRedesignEnabled={isHomePageRedesignEnabled} /> : null}
        <div className={css.CTAContainer}>
          <CTAHomepageContainer
            ctaUri={ctaUri}
            sectionForTracking="recipeCarousel"
          >
            {ctaText}
          </CTAHomepageContainer>
        </div>
      </div>
    )
  }

  return (
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
}

Carousel.propTypes = {
  numRecipes: PropTypes.number,
  ctaUri: PropTypes.string,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  isHomePageRedesignEnabled: PropTypes.bool,
}

Carousel.defaultProps = {
  numRecipes: 0,
  ctaUri: config.client.menu,
  ctaText: home.CTA.main,
  isHomePageRedesignEnabled: false,
}

export { Carousel }
