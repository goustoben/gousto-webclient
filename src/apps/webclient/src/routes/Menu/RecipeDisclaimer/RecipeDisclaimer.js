import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import Svg from 'Svg'
import { useBrandInfo } from '../domains/brand'
import { getRecipeDisclaimerProps } from '../selectors/recipe'
import css from './RecipeDisclaimer.css'

const RecipeDisclaimer = ({ recipeId }) => {
  const brandInfo = useBrandInfo()
  const brandTags = brandInfo.brand?.tags || []

  const claim = useSelector(state => getRecipeDisclaimerProps(state, { brandTags, recipeId }))

  if (!claim || !claim.disclaimer || !claim.theme) {
    return null
  }

  return (
    <div className={css.disclaimerWrapper} style={{backgroundColor: claim.theme.backgroundColor, color: claim.theme.color}}>
      <Svg fileName={claim.icon} className={css.disclaimerIcon} />
      <p className={css.disclaimerText}>{claim.disclaimer}</p>
    </div>
  )
}

RecipeDisclaimer.propTypes = {
  recipeId: PropTypes.string.isRequired,
}

export { RecipeDisclaimer }
