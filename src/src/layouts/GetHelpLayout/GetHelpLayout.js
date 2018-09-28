import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import { PageContent, PageHeader } from 'Page'
import BottomBar from 'BottomBar'

import css from './GetHelpLayout.css'

const GetHelpLayout = ({ title, body, children, fullWidthContent }) => {
	const bodyContent = []
	const footerContent = []
	const bodyContentCss = classnames(css.bodyContent, {
		[css.bodyContentFullWidth]: fullWidthContent
	})

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
				<div className={bodyContentCss}>
					{bodyContent}
				</div>
				{footerContent}
			</PageContent>
		</div>
	)
}

GetHelpLayout.propTypes = {
	body: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	fullWidthContent: PropTypes.bool,
}

GetHelpLayout.defaultProps = {
	fullWidthContent: false
}

export default GetHelpLayout
