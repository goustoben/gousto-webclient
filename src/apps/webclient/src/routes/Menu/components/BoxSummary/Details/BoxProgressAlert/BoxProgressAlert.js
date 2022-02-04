import React from 'react'
import PropTypes from 'prop-types'
import config from 'config/basket'
import { Alert } from 'goustouicomponents'
import { PricePerServingMessage } from 'components/PricePerServingMessage'
import { BoxProgressMessage } from '../../../BoxProgressMessage'

const BoxProgressAlert = ({ numRecipes }) => {
  const hasMaxRecipes = numRecipes >= config.maxRecipesNum

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
