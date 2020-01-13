import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import ModuleHeader from 'ModuleHeader'
import TestimonialCarousel from './TestimonialCarousel'
import Storystream from "../Storystream"
import css from './Testimonials.css'
import CTAHomepage from '../CTA'

const Testimonials = ({ redirect, enableStorystream, showLink, ctaText, ctaUri, ...props }) => (

  <div className={css.testimonials}>
    <ModuleHeader>Over 1 million meals delivered</ModuleHeader>
    <h3 className={css.subHeader}>And the reviews are pouring in:</h3>
    <TestimonialCarousel showLink={showLink} />
    {enableStorystream && (
      <section className={css.storystreamContainer}>
        <Storystream {...props} />
      </section>
    )}

    <CTAHomepage width={240} onClick={() => { redirect(ctaUri) }}>{ctaText}</CTAHomepage>
  </div>
)

Testimonials.propTypes = {
  redirect: PropTypes.func,
  showLink: PropTypes.bool,
  enableStorystream: PropTypes.bool,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  ctaUri: PropTypes.string,
}

Testimonials.defaultProps = {
  showLink: true,
  enableStorystream: false,
  ctaText: home.CTA.main,
  ctaUri: config.client.signup,
}

export default Testimonials
