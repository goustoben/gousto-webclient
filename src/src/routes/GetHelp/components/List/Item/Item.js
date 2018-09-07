import React, { PropTypes } from 'react'
import Link from 'Link'
import classnames from 'classnames'

import css from './Item.css'

export default class Item extends React.PureComponent {
	static propTypes = {
		label: PropTypes.string.isRequired,
		to: PropTypes.string,
		clientRouted: PropTypes.bool,
		onClick: PropTypes.func,
	}

	static defaultProps = {
		onClick: () => {},
	}

	state = {
		isExpanded: false,
	}

	toggleContent() {
		this.setState({ isExpanded: !this.state.isExpanded })
	}

	render() {
		const { label, to, clientRouted, expandableContent, onClick } = this.props
		const arrowClass = classnames({
			[css.itemArrowRight]: !this.state.isExpanded,
			[css.itemArrowDown]: this.state.isExpanded,
		})

		return (
			<li className={css.item} onClick={onClick}>
				{to ?
					<Link to={to} clientRouted={clientRouted} className={css.itemContent}>
						{label}
						<span className={css.itemArrowRight} />
					</Link>
					: null }
				{expandableContent ?
					<div>
						<div className={css.itemContent} onClick={() => this.toggleContent()}>
							{label}
							<span className={classnames(arrowClass)} />
						</div>
						{this.state.isExpanded ?
							React.createElement(expandableContent, null, null)
							: null}
					</div>
					: null }
			</li>
		)
	}
}
