import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import React from 'react'
import Immutable from 'immutable'

import { getMenuRecipeImage } from 'utils/image'
import css from './RoundelImage.css'

const RoundelImage = ({ roundelImage }) => {
  const roundelObj = Immutable.Iterable.isIterable(roundelImage) && roundelImage.size > 0 ? roundelImage : null

  if (roundelObj) {
    const image = roundelObj.getIn(['media', 'images']).find((value) => value.get('type') === 'headshot-image')
    const imageUrls = image ? image.get('urls') : null

    return (
      <div className={css.roundelImage}>
        {imageUrls && <img src={getMenuRecipeImage(imageUrls, 70)} alt={image.get('title')} />}
      </div>
    )
  }

  return null
}

RoundelImage.propTypes = {
  roundelImage: ImmutablePropTypes.mapContains({
    media: PropTypes.shape({
      images: PropTypes.array,
    }),
    name: PropTypes.string,
    celebrity: PropTypes.bool,
  }),
}

RoundelImage.defaultProps = {
  roundelImage: Immutable.Map({}),
}

export { RoundelImage }
