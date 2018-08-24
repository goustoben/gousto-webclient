import React, { PropTypes, PureComponent } from 'react'

import { CategoriesList } from './CategoriesList'
import { PageContent, PageHeader } from 'Page'
import { BottomBar } from 'BottomBar'
import Button from 'Button'
import Link from 'Link'
import { client as routes } from 'config/routes'

import css from './RefundCategories.css'

class RefundCategories extends PureComponent {
	render() {
		return (
			<div className={css.rootContainer}>
				<div className={css.header}>
					<PageHeader title={this.props.content.title} />
				</div>
				<PageContent className={css.pageContent}>
					<p className={css.copy}>
						{this.props.content.body}
					</p>
					<div className={css.issuesContainer}>
						<CategoriesList categories={this.props.categories} />
					</div>
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
				</PageContent>
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
