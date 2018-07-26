import React from 'react'
import StyledElement from 'StyledElement'
import SectionHeader from 'SectionHeader'

export const PageContent = (props) => StyledElement({
	...props,
	pageContainer: true,
	type: 'div',
})

PageContent.defaultProps = {
	margin: {
		top: 'XXL',
		bottom: 'XXL',
	},
}

export const PageHeader = (props) => <SectionHeader {...props} type="page" />

export default {
	PageContent,
	PageHeader,
}
