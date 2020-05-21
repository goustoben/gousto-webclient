import PropTypes from 'prop-types'
import React from 'react'
import Svg from 'Svg'
import css from './RecipeDisclaimer.css'

const RecipeDisclaimer = ({ claim }) => {
  if (!claim || !claim.disclaimer) {
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
  claim: PropTypes.shape({
    disclaimer: PropTypes.string,
    icon: PropTypes.string,
    theme: PropTypes.shape({
      color: PropTypes.string,
      backgroundColor: PropTypes.string,
      iconColor: PropTypes.string
    })
  })
}

RecipeDisclaimer.defaultProps = {
  claim: null,
}

export { RecipeDisclaimer }
