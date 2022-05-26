import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import { getWhyGoustoConfig } from 'config/home'
import { formatPrice } from 'utils/format'

import { CTAHomepageContainer } from '../CTA'
import { ModuleTitle } from '../ModuleTitle'
import { StepsGuide } from './StepsGuide'

import css from './WhyChooseGousto.css'

const WhyChooseGousto = ({ ctaUri, ctaText, pricePerServing }) => {
  const subtitle = (
    <Fragment>
      Impressively easy meals from just{' '}
      <span className={css.pricePerServing}>
        {pricePerServing ? formatPrice(pricePerServing) : ''} per serving
      </span>
      . All of the flavour, none of the fuss.
    </Fragment>
  )
  const { title } = getWhyGoustoConfig()

  return (
    <div className={css.whyGoustoContainer}>
      <ModuleTitle title={title} subTitle={subtitle} />
      <StepsGuide />
      <div className={css.CTAContainer}>
        <CTAHomepageContainer ctaUri={ctaUri} sectionForTracking="whyChooseGousto">
          {ctaText}
        </CTAHomepageContainer>
      </div>
    </div>
  )
}

WhyChooseGousto.propTypes = {
  ctaUri: PropTypes.string.isRequired,
  ctaText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  pricePerServing: PropTypes.string,
}

WhyChooseGousto.defaultProps = {
  pricePerServing: '',
}

export { WhyChooseGousto }
