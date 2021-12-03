import React from 'react'
import GoustoLink from 'Link'

import css from './CoronaVirusBanner.module.css'

const COVID_19_LINK = 'https://cook.gousto.co.uk/coronavirus/'

const CoronaVirusBanner = () => (
  <div className={css.container}>
    <div>
      <span className={css.infoIcon} />
    </div>
    <div>
      <p className={css.headerTitle}>We&apos;re full to the brim</p>
      <p className={css.headerText}>We can&apos;t take new customer orders right now, we&apos;re so sorry.</p>
      <ul className={css.bodyText}>
        <li>
          We&apos;re doing everything we can to get out more boxes.&nbsp;
          <a href={COVID_19_LINK}>Read more</a>
          .
        </li>
        <li>
          If you already have a Gousto subscription, please&nbsp;
          <GoustoLink to="#login" clientRouted={false}>log in</GoustoLink>
          .
        </li>
      </ul>
    </div>
  </div>
)

CoronaVirusBanner.propTypes = {}
CoronaVirusBanner.defaultProps = {}

export { CoronaVirusBanner }
