/* eslint-disable global-require */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import typography from 'design-language/typography.css'
import css from './TestedLoved.css'

const TestedLoved = ({ isHomePageRedesignEnabled }) => (
  <div className={classNames(css.container, { [css.homepageRedesign]: isHomePageRedesignEnabled })}>
    <h2 className={classNames(css.title, { [typography.fontStyleXL]: isHomePageRedesignEnabled })}>Tested and loved by</h2>
    <div className={css.logos}>
      <div className={css.logo} style={{ backgroundImage: `url(${require('./logos/telegraph.png')})` }} />
      <div className={css.logo} style={{ backgroundImage: `url(${require('./logos/buzzfeed.png')})` }} />
      <div className={css.logo} style={{ backgroundImage: `url(${require('./logos/independent.png')})` }} />
      <div className={css.fourthLogo} style={{ backgroundImage: `url(${require('./logos/now.png')})` }} />
      <div className={css.mobileSpacer} />
      <div className={css.logo} style={{ backgroundImage: `url(${require('./logos/closer.png')})` }} />
    </div>
  </div>
)

TestedLoved.propTypes = {
  isHomePageRedesignEnabled: PropTypes.bool,
}

TestedLoved.defaultProps = {
  isHomePageRedesignEnabled: false,
}

export default TestedLoved
