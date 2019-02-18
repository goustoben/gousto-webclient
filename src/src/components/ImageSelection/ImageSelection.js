import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Image from 'Image'
import classnames from 'classnames'
import css from './ImageSelection.css'

const ImageSelection = ({ content, children, onImageClick, onTitleClick }) => (
	<div className={css.scroll}>
		<div className={css.row}>
			{content.map((item, key) =>
				<div key={key} className={css.colSmall} >
					<div
					  className={classnames(css.imageContainer, { [css.pointer]: onImageClick })}
					  onClick={onImageClick ? () => { onImageClick(item.get('id')) } : undefined}
					>
						<Image
						  className={css.image}
						  media={item.get('images').toList().filter(x => x)}
						  title={item.get('title')}
						/>
					</div>
					<p
					  className={classnames(css.imageTitle, { [css.pointer]: onTitleClick })}
					  onClick={onTitleClick ? () => { onTitleClick(item.get('id')) } : undefined}
					>
						{item.get('title')}
					</p>
				</div>
			)}
		</div>
		{children}
	</div>
)

ImageSelection.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.instanceOf(Immutable.Map)
  ),
  children: PropTypes.node,
  onImageClick: PropTypes.func,
  onTitleClick: PropTypes.func,
}

ImageSelection.defaultProps = {
  content: [],
}

export default ImageSelection
