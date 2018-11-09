import React, { PropTypes } from 'react'
import classnames from 'classnames'
import icons from './icons.css'
import css from './Perk.css'
import reactnl2br from 'react-nl2br'

const Perk = (props) => (
	<div className={css.perkContainer} key={props.title}>
		<div className={css.perkInner}>
			<div className={css.perkCircle}>
				<div className={css.perkVerticalCenter}>
					<span className={classnames({ [icons[props.title]]: true })} ></span>
					<p className={css.circleCopy}>{reactnl2br(props.copy)}</p>
				</div>
			</div>
		</div>
	</div>
)

Perk.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
}

export default Perk
