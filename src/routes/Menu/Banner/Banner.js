import React from 'react'
import PropTypes from 'prop-types'

import Image from 'Image'
import { getImage } from 'utils/menu'
import css from './Banner.css'

const propTypes = {
  type: PropTypes.string.isRequired,
  collectionSlug: PropTypes.string,
  imageName: PropTypes.string,
  setThematic: PropTypes.func
}

const Banner = ({ imageName, type, collectionSlug, setThematic }) => (
  collectionSlug ? (
    <div
      role="button"
      tabIndex={0}
      className={css[type]}
      onClick={() => setThematic(collectionSlug, 'thematic', 'banner click')}
      onKeyPress={() => setThematic(collectionSlug, 'thematic', 'banner click')}
    />) :
    (
      <div className={css[type]}>
        <div className={css.content}>
          {(imageName && (
            <div className={css.gelPortrait}>
              <Image className={css.gelPortrait__image} media={getImage(imageName)} />
            </div>)
          )}
        </div>
      </div>
    )
)

Banner.propTypes = propTypes

export { Banner }
