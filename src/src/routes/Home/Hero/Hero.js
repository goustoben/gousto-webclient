import PropTypes from 'prop-types'
import React from 'react'
import home from 'config/home'
import config from 'config/routes'
import Content from 'containers/Content'
import CTAHomepage from '../CTA'
import css from './Hero.css'

//ContentKeys have been changed to Keys+"Default" to bypass CMS until CMS is working properly

const Hero = ({ redirect, ctaUri, ctaText, dataTesting, variant }) => (
  <div className={css[`container--${variant}`]} data-testing={dataTesting}>
    <div className={css[`textContainer--${variant}`]}>
      <h1 className={css.header}>
        <Content contentKeys="propositionMainHeadlineDefault">
          <span>{home.hero.header}</span>
        </Content>
      </h1>
      <h2 className={css.subHeader}>
        <Content contentKeys="propositionSupportingHeadlineDefault"><span>{home.hero.subheader}</span></Content>
      </h2>
      <div className={css.cta}>
        <CTAHomepage
          width={240}
          onClick={() => redirect(ctaUri)}
          dataTesting="homepageHeroCTA"
        >
          {ctaText}
        </CTAHomepage>
      </div>
    </div>
    <div className={css.spacer} />
  </div>
)

Hero.propTypes = {
  redirect: PropTypes.func,
  ctaUri: PropTypes.string,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  dataTesting: PropTypes.string,
  variant: PropTypes.string,
}

Hero.defaultProps = {
  ctaUri: config.client.menu,
  ctaText: home.CTA.main,
  variant: 'default',
}

export default Hero
