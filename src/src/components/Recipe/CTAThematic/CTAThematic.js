import React from 'react'
import PropTypes from 'prop-types'
import { getCurrentImage } from './getCurrentImage'
import { ThematicImage } from './ThematicImage'

import css from './CTAThematic.css'

const CHRISTMAS_THEMATIC_NAME = 'christmas-inspired'

const getOptionsForThematic = (thematicName) => {
  switch (thematicName) {
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
