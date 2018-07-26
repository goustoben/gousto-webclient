import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

const defaultImage = require('media/photos/gousto-share-box.jpg')

const Twitter = ({ href, imageUrl }) => (
	<Helmet
		meta={[
			{
				name: 'twitter:card',
				content: 'summary',
			},
			{
				name: 'twitter:creator',
				content: '@goustocooking',
			},
			{
				name: 'twitter:image',
				content: imageUrl,
			},
			{
				name: 'twitter:image:width',
				content: 1267,
			},
			{
				name: 'twitter:image:height',
				content: 766,
			},
			{
				name: 'twitter:site',
				content: '@goustocooking',
			},
			{
				name: 'twitter:url',
				content: href,
			},
		]}
	/>
)

Twitter.defaultProps = {
	imageUrl: defaultImage,
}

Twitter.propTypes = {
	href: PropTypes.string.isRequired,
	imageUrl: PropTypes.string,
}

export default Twitter
