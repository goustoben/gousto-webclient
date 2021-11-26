import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from 'utils/format'
import { getWhyGoustoConfig } from 'config/home'
import { StepsGuide } from './StepsGuide'
import { CTAHomepageContainer } from '../CTA'
import { ModuleTitle } from '../ModuleTitle'
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
