import React from 'react'
import classNames from 'classnames'
import css from './TrustPilot.css'

const TrustPilot = () => (
  <div className={css.trustPilotContainer}>
    <div className={css.leftSeedsArea} />
    <div className={css.textContainer}>
      <p className={css.deliveredMeals}>
        Over
        <span className={css.goustoRedColor}> 1 million meals </span>
        cooked and loved
      </p>
      <div
        className={classNames('trustpilot-widget', css.widget)}
        data-locale="en-GB"
        data-template-id="5419b6ffb0d04a076446a9af"
        data-businessunit-id="512cda6e000064000522fb6a"
        data-style-width="100%"
        data-theme="light"
        data-font-family="Montserrat"
        data-text-color="#333D47"
      >
        <a
          href="https://uk.trustpilot.com/review/gousto.co.uk"
          target="_blank"
          rel="noreferrer noopener"
        >
          Trustpilot
        </a>
      </div>
    </div>
    <div className={css.rightSeedsArea} />
  </div>
)

export { TrustPilot }
