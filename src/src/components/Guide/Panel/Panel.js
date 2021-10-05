import PropTypes from 'prop-types'
import React from 'react'
import Svg from 'Svg'
import css from './Panel.css'

const Panel = ({ path, title, description, graphicType }) => (
  <div className={css.container}>
    <div className={css.imageContainer}>
      {graphicType === 'img' ? <img className={css.image} src={path} alt={title} /> : null}
      {graphicType === 'svg' ? <Svg fileName={path} className={css.svg} /> : null}
    </div>
    <p className={css.title}>{title}</p>
    <div className={css.descriptionContainer}>
      <p className={css.description}>{description}</p>
    </div>
  </div>
)

Panel.propTypes = {
  path: PropTypes.string,
  title: PropTypes.node,
  description: PropTypes.node,
  graphicType: PropTypes.oneOf(['img', 'svg']),
}

Panel.defaultProps = {
  path: null,
  title: null,
  description: null,
  graphicType: 'img',
}

export { Panel }
