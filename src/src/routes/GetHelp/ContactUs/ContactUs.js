import React, { PropTypes } from 'react'

import { PageContent, PageHeader } from 'Page'
import { BottomBar } from 'BottomBar'
import Button from 'Button'
import Link from 'Link'
import { client as routes } from 'config/routes'

import css from './ContactUs.css'

const renderButtons = () => (
	<BottomBar>
		<Button color="secondary" width="no-auto" className={css.button} areChildrenInSegment>
			<Link
				noDecoration
				className={css.buttonChild}
				clientRouted
				to={routes.getHelp.index}
			>
				BACK
			</Link>
		</Button>
		<Button color="primary" width="no-auto" className={css.button} areChildrenInSegment>
			<Link
				noDecoration
				className={css.buttonChild}
				clientRouted={false}
				to={routes.myGousto}
			>
				done
			</Link>
		</Button>
	</BottomBar>
)

const ContactUs = ({ content: { title, body } }) => (
	<div className={css.rootContainer}>
		<div className={css.header}>
			<PageHeader title={title} />
		</div>
		<PageContent className={css.pageContent}>
			<p className={css.copy}>
				{body}
			</p>
			{renderButtons()}
		</PageContent>
	</div>
)

ContactUs.propTypes = {
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

export default ContactUs
