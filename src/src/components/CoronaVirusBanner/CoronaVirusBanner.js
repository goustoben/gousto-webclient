import React from 'react'
import GoustoLink from 'Link'

import css from './CoronaVirusBanner.css'

const COVID_19_LINK = 'https://cook.gousto.co.uk/coronavirus/'

const CoronaVirusBanner = () => (
  <div className={css.container}>
    <div>
      <span className={css.infoIcon} />
    </div>
    <div>
      <p className={css.headerText}>Due to extremely high demand, we can&apos;t take any new customer orders right now.</p>
      <p className={css.bodyText}>
        Read more at&nbsp;
        <a href={COVID_19_LINK}>cook.gousto.co.uk/coronavirus</a>
        . If you&apos;re an existing customer with an active subscription, please&nbsp;
        <GoustoLink to="#login" clientRouted={false}>log in</GoustoLink>
        &nbsp;to manage your order.
      </p>
    </div>
  </div>
)

CoronaVirusBanner.propTypes = {}
CoronaVirusBanner.defaultProps = {}

export { CoronaVirusBanner }
