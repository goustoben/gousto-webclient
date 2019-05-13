import React from 'react'
import css from './PerkCircle.css'
import config from 'config/jobs'
import Perk from './Perk/Perk'

class PerkCircle extends React.PureComponent {
  render() {
    const perks = config.Perks
    const perkItems = perks.map((perk) =>
      <div key={perk.title} >
        <Perk title={perk.title} copy={perk.copy} />
      </div>
    )

    return (
      <div className={css.flexContainer}>
        {perkItems}
      </div>
    )
  }
}

export default PerkCircle
