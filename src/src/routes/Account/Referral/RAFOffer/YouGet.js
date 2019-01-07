import React from 'react'
import PropTypes from 'prop-types'
import Gel from 'Gel'
import css from './YouGet.css'

const YouGet = ({ youGetOffer, offerColour }) => {
  return (
    <div className={css.youGetOffer}>
      <h3 className={css.youGetOfferTitle}>You get</h3>
      <Gel className={css.rafGel} size="large" color={offerColour}>
        <div className={css.rafGelContent}>
          <div>{youGetOffer}</div>
          <div>credit</div>
        </div>
      </Gel>
      <p className={css.youGetLabel}>towards your next box</p>
    </div>
  )
}

const propTypes = {
  youGetOffer: PropTypes.string,
  offerColour: PropTypes.string
}

const defaultProps = {
  offerColour: 'grey'
}

YouGet.propTypes = propTypes
YouGet.defaultProps = defaultProps

export { YouGet }
