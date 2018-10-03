import React from 'react'
import classnames from 'classnames'

import css from './TasteScore.css'
import Svg from 'Svg'

const TasteScore = ({ score, className }) => (
	(score > 0) ? (
		<div className={classnames(className, css.score)}>
			<Svg className={css.score__icon} fileName="icon-heart" />
			<p className={css.score__number}>{score}%</p>
		</div>
	) : null
)

export default TasteScore
