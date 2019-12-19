import PropTypes from 'prop-types'
import React from 'react'
import Svg from 'Svg'
import css from './NoResultsPage.css'

const NoResultsPage = ({ imageName, title, description }) => (
  <div className={css.page}>
    <Svg fileName={imageName} className={css.image} />
    <h2 className={css.title}>{title}</h2>
    <div className={css.description}>{description}</div>
  </div>
)

NoResultsPage.propTypes = {
  imageName: PropTypes.string,
  title: PropTypes.node,
  description: PropTypes.node,
}

export default NoResultsPage
