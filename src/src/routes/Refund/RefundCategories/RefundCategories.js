import React, { PropTypes, PureComponent } from 'react'

import { RefundItemList } from './RefundItemList'
import { PageContent, PageHeader } from 'Page'
import { BottomBar } from 'BottomBar'
import Button from 'Button'
import Link from 'Link'
import { client as routes } from 'config/routes'

import css from './RefundCategories.css'

class RefundCategories extends PureComponent {
	render() {
		return (
			<div>
				<PageHeader title={this.props.content.title} />
				<PageContent>
						<p>
							{this.props.content.body}
						</p>
						<RefundItemList categories={this.props.categories} />
				</PageContent>
				<BottomBar>
					<Button color="secondary" className={css.button}>
						<Link
							inButtonSegment
							noDecoration
							clientRouted={false}
							to={routes.myGousto}
						>
							BACK
						</Link>
					</Button>
				</BottomBar>
			</div>
		)
	}
}

RefundCategories.propTypes = {
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired
		})
	),
	content: PropTypes.shape({
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
	})
}

export default RefundCategories
