import React from 'react'
import Gel from 'Gel'
import css from './YouGet.css'

const YouGet = ({ youGet, colorOffer }) => {
  return (
    <div className={css.youGetOffer}>
      <h3>You get</h3>
      <Gel className={css.rafGel} size="large" color={colorOffer}>
        <div className={css.rafGelContent}>
          <div>{youGet}</div>
          <div>credit</div>
        </div>
      </Gel>
      <p className={css.youGetLabel}>towards your next box</p>
    </div>
  )
}

export { YouGet }
