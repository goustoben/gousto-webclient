import React, { useEffect } from 'react'

import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { useIsFiveRecipesExperimentEnabled } from 'hooks/useIsFiveRecipesEnabled'

import { BoxPricesComponent } from './BoxPricesComponent'
import { boxTypes, BoxType, seo } from './boxPricesConfig'
import { BoxDescriptorsPropType } from './boxPricesPropTypes'

const useGetNumPersonsToBoxDescriptorsForFiveRecipes = (numPersonsToBoxDescriptors) => {
  const isFiveRecipesExperimentEnabled = useIsFiveRecipesExperimentEnabled()
  const boxDescriptorsCopy = { ...numPersonsToBoxDescriptors }

  Object.keys(boxDescriptorsCopy).forEach((numPersons) => {
    const boxDescriptor = boxDescriptorsCopy[numPersons]
    const { boxSizeTrackingValue } = boxTypes[numPersons]

    if (
      boxSizeTrackingValue === BoxType.Large ||
      (boxSizeTrackingValue === BoxType.Regular && !isFiveRecipesExperimentEnabled)
    ) {
      boxDescriptorsCopy[numPersons] = boxDescriptor.slice(0, -1)
    }
  })

  return boxDescriptorsCopy
}

const BoxPrices = ({
  boxPricesBoxSizeSelected,
  numPersonsToBoxDescriptors,
  loading,
  error,
  trackUTMAndPromoCode,
  menuLoadBoxPrices,
}) => {
  const updatedNumPersonsToBoxDescriptors = useGetNumPersonsToBoxDescriptorsForFiveRecipes(
    numPersonsToBoxDescriptors,
  )
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
        numPersonsToBoxDescriptors={updatedNumPersonsToBoxDescriptors}
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
