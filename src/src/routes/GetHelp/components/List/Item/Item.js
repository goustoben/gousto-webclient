import React, { PropTypes } from 'react'
import Link from 'Link'
import classnames from 'classnames'

import css from './Item.css'

export default class Item extends React.PureComponent {
	static propTypes = {
		label: PropTypes.string.isRequired,
		to: PropTypes.string,
		clientRouted: PropTypes.bool,
		expandableContent: PropTypes.node,
		isHiddenOnMobile: PropTypes.bool,
		customOnClick: PropTypes.func,
		onClick: PropTypes.func,
	}

	static defaultProps = {
		isHiddenOnMobile: false,
		onClick: () => {},
	}

	state = {
		isExpanded: false,
	}

	toggleContent() {
		this.setState({ isExpanded: !this.state.isExpanded })
	}

	render() {
		const {
			label,
			to,
			clientRouted,
			expandableContent,
			isHiddenOnMobile,
			customOnClick,
			onClick
		} = this.props
		const { isExpanded } = this.state
		const arrowClass = classnames({
			[css.itemArrowRight]: !isExpanded,
			[css.itemArrowDown]: isExpanded,
		})

		return (
			<li className={classnames(css.item, { [css.hiddenOnMobile]: isHiddenOnMobile })} onClick={onClick}>
				{to ?
					<Link to={to} clientRouted={clientRouted} className={css.itemContent}>
						{label}
						<span className={css.itemArrowRight} />
					</Link>
					: null }
				{!to && !customOnClick && expandableContent ?
					<div>
						<div className={css.itemContent} onClick={() => this.toggleContent()}>
							{label}
							<span className={classnames(arrowClass)} />
						</div>
						{isExpanded ? expandableContent : null}
					</div>
					: null }
				{!to && !expandableContent && customOnClick ?
					<div className={css.itemContent} onClick={() => customOnClick()}>
						{label}
						<span className={classnames(arrowClass)} />
					</div>
					: null }
			</li>
		)
	}
}
