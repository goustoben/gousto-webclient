import React, { PropTypes } from 'react'
import Immutable from 'immutable'
import Link from 'Link'
import Block from 'Page/Block'
import Details from 'Page/Block/Details'
import { Div } from 'Page/Elements'
import Title from 'Page/Block/Title'
import Image from 'Page/Block/Image'

const CollectionItem = ({ link, media, title }) => {
	const CollectionContent = (
		<Block>
			<Image
				alt={title}
				maxMediaSize={400}
				media={media}
			/>
			<Details style="singleLineTitle">
				<Title iconAfter="fa-angle-right" headlineFont>
					{title}
				</Title>
			</Details>
		</Block>
	)

	return link ?
		<Link
			noDecoration
			to={link}
		>
			{CollectionContent}
		</Link> :
		<Div>
			{CollectionContent}
		</Div>
}

CollectionItem.propTypes = {
	title: PropTypes.string,
	media: PropTypes.instanceOf(Immutable.List),
	link: PropTypes.string,
}

export default CollectionItem
