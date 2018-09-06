import React, { PropTypes } from 'react'

import { PageContent, PageHeader } from 'Page'
import { BottomBar } from 'BottomBar'

import css from './GetHelpLayout.css'

const GetHelpLayout = ({ title, body, children }) => {
	const bodyContent = []
	const footerContent = []

	React.Children.forEach(children, child => {
		if (child.type === BottomBar) {
			footerContent.push(child)
		} else {
			bodyContent.push(child)
		}
	})

	return (
		<div className={css.rootContainer}>
			<div className={css.header}>
				<PageHeader title={title} />
			</div>
			<PageContent className={css.pageContent}>
				<p className={css.bodyDescription}>
					{body}
				</p>
				<div className={css.bodyContent}>
					{bodyContent}
				</div>
				{footerContent}
			</PageContent>
		</div>
	)
}

GetHelpLayout.propTypes = {
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
}

export default GetHelpLayout
