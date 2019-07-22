import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Image from 'Image'
import { Col } from 'Page/Grid'
import css from './RecipeCard.css'

const propTypes = {
  link: PropTypes.string.isRequired,
  images: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.List),
    PropTypes.string
  ]).isRequired,
  title: PropTypes.string.isRequired
}

const maxMediaSize = 400

const RecipeCard = ({ link, images, title }) => (
  <Col col-xs-6 col-lg-2>
    <a href={link} className={css.cardContainer}>
      <div className={css.cardContent}>
        <Image media={images} title={title} maxMediaSize={maxMediaSize} />
        <p className={css.title}>
          {title}&nbsp;
          <span className={css.arrowRight} />
        </p>
      </div>
    </a>
  </Col>
)

RecipeCard.propTypes = propTypes

export { RecipeCard }
