import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'

import { getCookingTime } from 'utils/recipe'
import css from './CookingTime.css'

const blankSpace = String.fromCharCode(160)

const CookingTime = ({ time }) => (
  <div>
    <Svg
      fileName="icon-time"
      className={css.icon}
    />
    <span className={css.description}>{blankSpace}Takes {getCookingTime(time)}</span>
  </div>
)

CookingTime.propTypes = {
  time: PropTypes.number.isRequired,
}

export default CookingTime
