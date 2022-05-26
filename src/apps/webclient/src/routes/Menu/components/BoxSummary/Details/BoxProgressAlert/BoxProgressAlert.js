import React from 'react'

import { Alert } from 'goustouicomponents'
import PropTypes from 'prop-types'

import { PricePerServingMessage } from 'components/PricePerServingMessage'
import { useNumPortions } from 'routes/Menu/domains/basket/internal/useNumPortions'
import { useSupportedBoxTypes } from 'routes/Menu/domains/basket/internal/useSupportedBoxTypes'

import { BoxProgressMessage } from '../../../BoxProgressMessage'

const BoxProgressAlert = ({ numRecipes }) => {
  const { maxRecipesForPortion } = useSupportedBoxTypes()
  const { numPortions } = useNumPortions()
  const maxRecipesNum = maxRecipesForPortion(numPortions)
  const hasMaxRecipes = numRecipes >= maxRecipesNum

  return (
    <div data-testing="boxProgressAlert">
      <Alert type={hasMaxRecipes ? 'success' : 'info'}>
        <PricePerServingMessage />
        <BoxProgressMessage numRecipes={numRecipes} />
      </Alert>
    </div>
  )
}

BoxProgressAlert.propTypes = {
  numRecipes: PropTypes.number.isRequired,
}

export { BoxProgressAlert }
