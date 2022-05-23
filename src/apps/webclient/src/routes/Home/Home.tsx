import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import menuFetchData from 'routes/Menu/fetchData'
import { defaultVariant, knownVariants, seo } from 'config/home'
import routesConfig from 'config/routes'
import { generateHref } from 'Helmet/GoustoHelmet'
import { menuLoadBoxPrices } from 'actions/menu'
import { RibbonTriggerContainer } from 'components/RibbonTrigger'
import { HomeSections } from 'routes/Home/HomeSections'
import { getPricePerServing } from 'routes/BoxPrices/boxPricesSelectors'
import { useLocation } from 'routes/Menu/domains/collections/internal/useLocation'
import authActions from '../../actions/auth'
import { PromoBanner } from './PromoBanner'

// eslint-disable-next-line no-shadow
enum Variant {
  Default,
}

function getHelmetLink(location: any) {
  const {
    client: { home },
  } = routesConfig
  const locationVariant = location.query.variant
  const knownVariant = knownVariants.includes(locationVariant) ? locationVariant : defaultVariant
  const variant = location && location.query ? knownVariant : defaultVariant

  return variant !== Variant.Default ? [{ rel: 'canonical', href: generateHref(home) }] : []
}

export function Home() {
  const location = useLocation()
  const dispatch = useDispatch()
  const pricePerServing = useSelector(getPricePerServing)
  const helmetLink = getHelmetLink(location)

  useEffect(() => {
    dispatch(authActions.redirectLoggedInUser())
  }, [dispatch])

  useEffect(() => {
    const dispatchMenuLoadBoxPrices = async () =>
      pricePerServing == null && dispatch(menuLoadBoxPrices())
    // TODO: investigate why it should be called with delay
    // TODO: change name
    const prefetchTimer = setTimeout(() => {
      dispatch(menuFetchData({ query: {}, params: {} }, false, true))
      clearTimeout(prefetchTimer)
    }, 500)

    dispatchMenuLoadBoxPrices()

    return () => {
      if (prefetchTimer) {
        clearTimeout(prefetchTimer)
      }
    }
  }, [pricePerServing, dispatch])

  return (
    <>
      <Helmet
        title={seo.title}
        meta={seo.meta}
        link={helmetLink}
        style={[
          {
            cssText: `
              #react-root {
                height: 100%;
              }
            `,
          },
        ]}
      />
      <PromoBanner />
      <HomeSections />
      <RibbonTriggerContainer name="home-page" />
    </>
  )
}
