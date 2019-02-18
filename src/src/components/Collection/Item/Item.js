import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Link from 'Link'
import Block from 'Page/Block'
import Details from 'Page/Block/Details'
import { Div } from 'Page/Elements'
import Icon from 'Icon'
import { H2 } from 'Page/Header'
import Image from 'Page/Block/Image'
import css from './Item.css'

const CollectionItem = ({ link, media, title }) => {
  const CollectionContent = (
		<Block>
			<Image
			  alt={title}
			  maxMediaSize={400}
			  media={media}
			/>
			<Details style="singleLineTitle">
				<div className={css.title}>
					<H2 headlineFont>
						{title}
					</H2>
				</div>
				<Icon
				  className={css.icon}
				  name="fa-angle-right"
				/>
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
