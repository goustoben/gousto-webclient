import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Image from 'Image'
import css from './ImageSelection.css'

const ImageSelection = ({ content, onImageClick }) => (
  <div className={css.scroll}>
    <div className={css.row}>
      {content.length > 0 && content.map(item => {

        const [imageId, imageTitle, images] = [
          item.get('id'),
          item.get('title'),
          item.get('images'),
        ]

        const handleImageClick = () => onImageClick(imageId)

        return (
          <div key={imageId} className={css.colSmall} >
            <button
              type="button"
              className={css.imageContainer}
              onClick={handleImageClick}
            >
              <Image
                className={css.image}
                media={images.toList()}
                title={imageTitle}
              />
            </button>
            <p
              className={css.imageTitle}
              onClick={handleImageClick}
            >
              {imageTitle}
            </p>
          </div>
        )
      })}
    </div>
  </div>
)

ImageSelection.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.instanceOf(Immutable.Map)
  ),
  onImageClick: PropTypes.func,
}

ImageSelection.defaultProps = {
  content: [Immutable.Map()],
  onImageClick: () => {},
}

export default ImageSelection
