import React, { useEffect } from 'react'

import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { seo } from 'routes/BoxPrices/boxPricesConfig'

import { BoxPricesComponent } from './BoxPricesComponent'
import { BoxDescriptorsPropType } from './boxPricesPropTypes'

const BoxPrices = ({
  boxPricesBoxSizeSelected,
  numPersonsToBoxDescriptors,
  loading,
  error,
  trackUTMAndPromoCode,
  menuLoadBoxPrices,
}) => {
  useEffect(() => {
    menuLoadBoxPrices()
  }, [menuLoadBoxPrices])

  return (
    <div>
      <Helmet title={seo.title} meta={seo.meta} />
      <BoxPricesComponent
        error={error}
        loading={loading}
        boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
        numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
        trackUTMAndPromoCode={trackUTMAndPromoCode}
      />
    </div>
  )
}

BoxPrices.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  boxPricesBoxSizeSelected: PropTypes.func,
  numPersonsToBoxDescriptors: PropTypes.objectOf(BoxDescriptorsPropType),
  trackUTMAndPromoCode: PropTypes.func,
  menuLoadBoxPrices: PropTypes.func,
}

BoxPrices.defaultProps = {
  loading: false,
  error: null,
  boxPricesBoxSizeSelected: () => {},
  numPersonsToBoxDescriptors: null,
  trackUTMAndPromoCode: () => {},
  menuLoadBoxPrices: () => {},
}

export { BoxPrices }
