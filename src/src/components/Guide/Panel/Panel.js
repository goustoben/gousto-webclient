import PropTypes from 'prop-types'
import React from 'react'
import Svg from 'Svg'
import classNames from 'classnames'
import typography from 'design-language/typography.css'
import css from './Panel.css'

const Panel = ({ path, title, description, graphicType, isHomePageRedesignEnabled }) => (
  <div className={classNames(css.container, {[css.homepageRedesign]: isHomePageRedesignEnabled})}>
    <div className={css.imageContainer}>
      {graphicType === 'img' ? <img className={css.image} src={path} alt={title} /> : null}
      {graphicType === 'svg' ? <Svg fileName={path} className={css.svg} /> : null}
    </div>
    <p className={classNames({ [css.title]: !isHomePageRedesignEnabled, [css.titleRedesign]: isHomePageRedesignEnabled })}>{title}</p>
    <div className={css.descriptionContainer}>
      <p className={classNames(css.description, {[typography.fontStyleBody]: isHomePageRedesignEnabled })}>{description}</p>
    </div>
  </div>
)

Panel.propTypes = {
  path: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  graphicType: PropTypes.oneOf(['img', 'svg']),
  isHomePageRedesignEnabled: PropTypes.bool,
}

Panel.defaultProps = {
  path: '',
  title: [],
  description: '',
  graphicType: 'img',
  isHomePageRedesignEnabled: false,
}

export { Panel }
