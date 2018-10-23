import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

const defaultImage = require('media/photos/gousto-share-box.jpg')
const localisation = require('config/localisation')

const OpenGraph = ({ href, imageUrl }) => (
	<Helmet
		meta={[
			{
				property: 'og:description',
				content: 'Gousto',
			},
			{
				property: 'og:image',
				content: imageUrl,
			},
			{
				property: 'og:image:height',
				content: 766,
			},
			{
				property: 'og:image:width',
				content: 1267,
			},
			{
				property: 'og:site_name',
				content: 'Gousto',
			},
			{
				property: 'og:title',
				content: 'Gousto',
			},
			{
				property: 'og:type',
				content: 'website',
			},
			{
				property: 'og:url',
				content: href,
			},
			{
				property: 'og:locale',
				content: localisation.locale,
			},
		]}
	/>
)

OpenGraph.defaultProps = {
	imageUrl: defaultImage,
}

OpenGraph.propTypes = {
	href: PropTypes.string.isRequired,
	imageUrl: PropTypes.string,
}

export default OpenGraph
