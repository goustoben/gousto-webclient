import PropTypes from 'prop-types'
import React from 'react'
import css from './Dots.css'

const Dots = ({ steps, stepNo }) => (
  <div className={css.dots}>
    {Array.from(Array(steps)).map((s, step) => <div key={s && s.get('name')} className={step <= stepNo ? css.filledDot : css.dot} />)}
  </div>
)

Dots.propTypes = {
  stepNo: PropTypes.number,
  steps: PropTypes.number,
}

Dots.defaultProps = {
  stepNo: 1,
  steps: 1,
}

export { Dots }
