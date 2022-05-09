import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import SlickCarousel from 'Carousel'
import { DetailImage as Image } from '../DetailImage'
import { ContentMask } from './ContentMask'
import { Arrow } from './Arrow'
import css from './Carousel.css'

const Carousel = ({ images, media, view, dots, arrows }) =>
  images.size ? (
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
        {images.map((image) => (
          <div className={css.slide} key={image.get('type')}>
            <ContentMask className={css.mask}>
              <p className={css.imageTitle}>{image.get('title')}</p>
              <p className={css.imageDescription}>{image.get('description')}</p>
            </ContentMask>
            <Image media={image.get('urls')} title={image.get('title')} view={view} lazy={false} />
          </div>
        ))}
      </SlickCarousel>
    </div>
  ) : (
    <Image media={media} />
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
