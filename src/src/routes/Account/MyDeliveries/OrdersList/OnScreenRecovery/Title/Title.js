import PropTypes from 'prop-types'
import React from 'react'

import css from './Title.css'

const propTypes = {
  title: PropTypes.string.isRequired,
}

const Title = ({ title }) => {
  return (
    <div className={css.title}>
      {title}
    </div>
  )
}

Title.propTypes = propTypes

export { Title }
