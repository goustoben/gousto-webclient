import React from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'

import Svg from 'Svg'
import css from './TasteScore.css'

const propTypes = {
  score: PropType.number,
  className: PropType.string,
}

const TasteScore = ({ score, className }) => (
  (score > 0) ? (
    <div className={classnames(className, css.score)}>
      <Svg className={css.score__icon} fileName="icon-heart" />
      <p className={css.score__number}>{score}%</p>
    </div>
  ) : null
)

TasteScore.propTypes = propTypes

export default TasteScore
