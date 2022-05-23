import React from 'react'
import { useSelector } from 'react-redux'
import { CTA } from 'config/home'
import routesConfig from 'config/routes'
import { PriceComparisonTable, priceComparisonTableToken } from 'routes/Home/PriceComparisonTable'
import { Hero } from 'routes/Home/Hero'
import { Carousel } from 'routes/Home/Carousel'
import { TrustPilot } from 'routes/Home/TrustPilot'
import { WhyChooseGousto } from 'routes/Home/WhyChooseGousto'
import { JoeWicks } from 'routes/Home/JoeWicks'
import { EmailForm } from 'routes/Home/EmailForm'
import { getIsAuthenticated } from 'selectors/auth'
import { getIsSignupReductionEnabled } from 'selectors/features'
import { getPricePerServing } from 'routes/BoxPrices/boxPricesSelectors'

function getCtaUriAndText(isAuthenticated: boolean) {
  const {
    client: { menu, signup },
  } = routesConfig

  if (isAuthenticated) {
    return {
      ctaUri: menu,
      ctaText: CTA.loggedIn.text,
    }
  }

  return {
    ctaUri: signup,
    ctaText: CTA.text,
  }
}

export function HomeSections() {
  // TODO: move `pricePerServing` to WhyGousto component
  const pricePerServing = useSelector(getPricePerServing)
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isSignupReductionEnabled = useSelector(getIsSignupReductionEnabled)
  const { ctaUri, ctaText } = getCtaUriAndText(isAuthenticated)

  return (
    <>
      <section data-module-name="hero">
        <Hero ctaText={ctaText} ctaUri={ctaUri} isAuthenticated={isAuthenticated} />
      </section>

      <section data-module-name="trustPilot">
        <TrustPilot />
      </section>

      <section data-module-name={priceComparisonTableToken}>
        <PriceComparisonTable />
      </section>

      <section data-module-name="whyChooseGousto">
        {/* TODO: move `pricePerServing` to WhyGousto component */}
        <WhyChooseGousto ctaText={ctaText} ctaUri={ctaUri} pricePerServing={pricePerServing} />
      </section>

      <section data-module-name="joeWicks">
        <JoeWicks />
      </section>

      <section data-module-name="recipes">
        <Carousel ctaText={ctaText} ctaUri={ctaUri} />
      </section>

      {isSignupReductionEnabled ? (
        <section data-module-name="emailForm">
          <EmailForm />
        </section>
      ) : null}
    </>
  )
}
