import React, { PropTypes } from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import logger from 'utils/logger'
import css from './Image.css'
import Image from 'Image'

function getPhoto(filename) {
  let photoPath

  try {
    photoPath = require(`media/photos/${filename}`) // eslint-disable-line global-require
  } catch (e) {
    logger.warning(`Subscription pause image "${filename}" not found in photos`)
  }

  return photoPath
}

const SubscriptionPauseImage = ({ photo, title, urls }) => {
  if (!photo && !urls) {
    return null
  }

  return (
		<div className={css.container}>
			<Image
			  media={urls ? Immutable.fromJS(urls) : getPhoto(photo)}
			  title={title}
			/>
		</div>
  )
}

SubscriptionPauseImage.propTypes = {
  description: PropTypes.string,
  photo: PropTypes.string,
  title: PropTypes.string,
  urls: PropTypes.array,
}

export default SubscriptionPauseImage
