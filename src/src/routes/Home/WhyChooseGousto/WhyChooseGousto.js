import React from 'react'
import PropTypes from 'prop-types'
import home from 'config/home'
import config from 'config/routes'
import { Heading } from 'goustouicomponents'
import { StepsGuide } from './StepsGuide/StepsGuide'
import css from './WhyChooseGousto.css'
import { CTAHomepageContainer } from '../CTA'

const WhyChooseGousto = ({ ctaUri, ctaText }) => (
  <div className={css.whyGoustoContainer}>
    <div className={css.title}>
      <Heading type="h1" size="fontStyle2XL" hasMargin={false}>Why choose Gousto?</Heading>
    </div>
    <div className={css.priceSubTitle}>
      <p className={css.subTitle}>
        Cook up impressive meals from just
        <span className={css.pricePerServing}> £2.98 per serving</span>
        . All of the flavour and none of the fuss!
      </p>
    </div>
    <StepsGuide />
    <div className={css.CTAContainer}>
      <CTAHomepageContainer
        ctaUri={ctaUri}
        sectionForTracking="whyChooseGousto"
      >
        {ctaText}
      </CTAHomepageContainer>
    </div>
  </div>
)

WhyChooseGousto.propTypes = {
  ctaUri: PropTypes.string,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

WhyChooseGousto.defaultProps = {
  ctaUri: config.client.signup,
  ctaText: home.CTA.mainRedesign,
}

export {
  WhyChooseGousto
}
