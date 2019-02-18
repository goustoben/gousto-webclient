import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import reactnl2br from 'react-nl2br'
import icons from './icons.css'
import css from './Perk.css'

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
