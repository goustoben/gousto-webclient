import React from 'react'
import PropTypes from 'prop-types'
import { getCurrentImage } from './getCurrentImage'
import { ThematicImage } from './ThematicImage'

import css from './CTAThematic.css'

const TASTE_OF_JAPAN_THEMATIC_NAME = 'gousto-x-wagamama'
const CHRISTMAS_THEMATIC_NAME = 'christmas-inspired'

const getOptionsForThematic = (thematicName) => {
  switch (thematicName) {
  case TASTE_OF_JAPAN_THEMATIC_NAME:
    return [
      { start: '2019-10-01T00:00:00+01:00', url: 'toj_yasaiyaki_donburi.jpg' },
      { start: '2019-10-08T00:00:00+01:00', url: 'toj_all4recipes.jpg' },
      { start: '2019-10-15T00:00:00+01:00', url: 'toj_ramen_tonkatsu.jpg' },
      { start: '2019-10-22T00:00:00+01:00', url: 'toj_yasaiyaki_donburi.jpg' },
      { start: '2019-10-29T00:00:00+01:00', url: 'toj_ramen_donburi.jpg' }
    ]
  case CHRISTMAS_THEMATIC_NAME:
    return [
      { start: '2019-11-19T00:00:00+01:00', url: 'christmas_dinner.jpg' },
    ]
  default:
    return null
  }
}

const CTAThematic = ({ name, selectedDate }) => {
  const options = getOptionsForThematic(name)

  if (options === null) {
    return null
  }

  const currentImage = getCurrentImage(selectedDate, options)

  if (currentImage === null) {
    return null
  }

  return (
    <section className={css.staticImgContainer}>
      <ThematicImage imageName={currentImage} />
    </section>
  )
}

CTAThematic.propTypes = {
  name: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired
}

export { CTAThematic, CHRISTMAS_THEMATIC_NAME }
