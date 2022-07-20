import PropTypes from 'prop-types'
import React from 'react'
import css from './ProgressSoFarr.css'

const ProgressSoFar = ({
  total,
  completed,
  selected,
  discount
}) => {
  const generateCells = (total, completed, selected) => {
    const cells = []
    for (let i = 0; i < total; i++) {
      const cell = []
      if (i < completed) cell.push('filled')
      if (i == selected - 1) cell.push('selected')
      cells.push(cell)
    }

    return cells
  }

  return (
    <div className={css.progressSoFar}>
      <div>Progress so far:</div>
      <div className={css.counter}><span className={css.superBig}>{completed}/{total}</span> boxes</div>
      <div className={css.progressBarSection}>
        <div className={css.progressBar}>
          {
            generateCells(total, completed, selected).map((cell, i) =>
              <div className={cell.reduce((classes, val) => `${classes} ${css[cell]}`, '')} key={i} />)
          }
        </div>
        <div className={css.progressBarLabel}>{discount} OFF for 1 month</div>
      </div>
    </div>
  )
}

ProgressSoFar.propTypes = {
  copy: PropTypes.shape({
    button: PropTypes.string,
    findMore: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  total: PropTypes.number,
  completed: PropTypes.number,
  updateTo: PropTypes.number,
  selected: PropTypes.number,
  discount: PropTypes.string
}

ProgressSoFar.defaultProps = {

}

export { ProgressSoFar }
