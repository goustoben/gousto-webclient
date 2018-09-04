import React, { PropTypes } from 'react'

import { PageContent, PageHeader } from 'Page'
import { BottomBar } from 'BottomBar'
import Button from 'Button'
import Link from 'Link'
import { client as routes } from 'config/routes'

import css from './Contact.css'

const renderButtons = (button1Copy, button2Copy) => (
	<BottomBar>
		<Button color="secondary" width="no-auto" className={css.button} areChildrenInSegment>
			<Link
				noDecoration
				className={css.buttonChild}
				clientRouted
				to={routes.getHelp.index}
			>
				{button1Copy}
			</Link>
		</Button>
		<Button color="primary" width="no-auto" className={css.button} areChildrenInSegment>
			<Link
				noDecoration
				className={css.buttonChild}
				clientRouted={false}
				to={routes.myGousto}
			>
				{button2Copy}
			</Link>
		</Button>
	</BottomBar>
)

const Contact = ({ content: { title, body, button1Copy, button2Copy } }) => (
	<div className={css.rootContainer}>
		<div className={css.header}>
			<PageHeader title={title} />
		</div>
		<PageContent className={css.pageContent}>
			<p className={css.copy}>
				{body}
			</p>
			{renderButtons(button1Copy, button2Copy)}
		</PageContent>
	</div>
)

Contact.propTypes = {
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

export default Contact
