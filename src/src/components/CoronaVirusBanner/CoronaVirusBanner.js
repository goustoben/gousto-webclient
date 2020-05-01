import React from 'react'
import GoustoLink from 'Link'

import css from './CoronaVirusBanner.css'

const COVID_19_LINK = 'https://cook.gousto.co.uk/coronavirus/'
const CBG_LINK = 'https://cook.gousto.co.uk/chosenbygousto_menu'

const CoronaVirusBanner = () => (
  <div className={css.container}>
    <div>
      <span className={css.infoIcon} />
    </div>
    <div>
      <p className={css.headerText}>We can&apos;t take new customer orders right now, we&apos;re so sorry.</p>
      <ul className={css.bodyText}>
        <li>
          We&apos;re doing everything we can to get more recipe boxes out, enter your details&nbsp;
          <a href={COVID_19_LINK}>here</a>
          &nbsp;and we&apos;ll let you know as soon as we are accepting new customers again.
        </li>
        <li>
          We have developed a great solution to allow you to order a one-off box with preselected recipes today,&nbsp;
          <a href={CBG_LINK}>here</a>
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
