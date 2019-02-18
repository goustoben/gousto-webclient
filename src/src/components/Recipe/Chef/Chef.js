import PropTypes from 'prop-types'
import React from 'react'
import { Iterable } from 'immutable'

import { getMenuRecipeImage } from 'utils/image'
import css from './Chef.css'

const Chef = ({ chef }) => {
  const chefObj = Iterable.isIterable(chef) && chef.size > 0 ? chef : null

  if (chefObj) {
    const image = chefObj.getIn(['media', 'images']).find((value) => value.get('type') === 'headshot-image')
    const imageUrls = image ? image.get('urls') : null

    return (
			<div className={css.chef}>
				{imageUrls && <img src={getMenuRecipeImage(imageUrls, 70)} alt={image.get('title')} />}
			</div>
    )
  }

  return null
}

Chef.propTypes = {
  chef: PropTypes.shape({
    media: PropTypes.shape({
      images: PropTypes.Array,
    }),
    name: PropTypes.string,
    celebrity: PropTypes.bool,
  }),
}

export default Chef
