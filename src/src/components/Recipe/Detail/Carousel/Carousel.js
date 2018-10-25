import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import css from './Carousel.css'
import Image from 'Recipe/Image'
import SlickCarousel from 'Carousel'
import ContentMask from 'Recipe/Detail/Carousel/ContentMask'
import Arrow from 'Recipe/Detail/Carousel/Arrow'

const Carousel = ({ images, media, view, dots, arrows }) => (
	(images.size)
	? (
		<div className={css.carousel}>
			<SlickCarousel
				dots={dots}
				dotsClass={css.dots}
				arrows={arrows}
				prevArrow={<Arrow action="prev" direction="left" />}
				nextArrow={<Arrow action="next" direction="right" />}
				infinite
				autoplaySpeed={5000}
				speed={200}
			>
				{images.map((image, idx) => (
					<div className={css.slide} key={idx}>
						<ContentMask className={css.mask}>
							<p className={css.imageTitle}>{image.get('title')}</p>
							<p className={css.imageDescription}>{image.get('description')}</p>
						</ContentMask>
						<Image media={image.get('urls')} title={image.title} view={view} />
					</div>
				))}
			</SlickCarousel>
		</div>
	) : (
		<Image media={media} />
	)
)

Carousel.propTypes = {
	images: PropTypes.instanceOf(Immutable.List),
	media: PropTypes.instanceOf(Immutable.List),
	view: PropTypes.oneOf(['fineDineInDetail']),
	dots: PropTypes.bool,
	arrows: PropTypes.bool,
}

Carousel.defaultProps = {
	images: Immutable.List([]),
	media: Immutable.List([]),
	view: 'fineDineInDetail',
	dots: true,
	arrows: true,
}

export default Carousel
