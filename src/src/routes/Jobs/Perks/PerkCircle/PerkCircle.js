import React from 'react'
import config from 'config/jobs'
import css from './PerkCircle.css'
import Perk from './Perk/Perk'

const PerkCircle = () => {
  const { Perks } = config

  return (
    <div className={css.flexContainer}>
      {
        Perks.map(perk => (
          <div key={perk.title}>
            <Perk title={perk.title} copy={perk.copy} />
          </div>
        ))
      }
    </div>
  )
}

export default PerkCircle
