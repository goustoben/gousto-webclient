import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import css from './FiveADay.css'

const blankSpace = String.fromCharCode(160)

const FiveADay = ({ fiveADayValue }) => (

    <div>
      <Svg
        fileName="icon-five-a-day"
        className={css.icon}
      />
      <span className={css.description}>
        {blankSpace}{fiveADayValue}/5 a day
      </span>
    </div>

)

FiveADay.propTypes = {
  fiveADayValue: PropTypes.number.isRequired,
}

export { FiveADay }
