import PropTypes from 'prop-types'
import React from 'react'
import Carousel from 'Carousel'
import Immutable from 'immutable'/* eslint-disable new-cap */
import config from 'config/home'
import Testimonial from './Testimonial'
import css from './TestimonialCarousel.css'

const TestimonialCarousel = ({ testimonials = config.testimonials, showLink }) => (
	<div className={css.container}>
		<Carousel
		  dots
		  adaptiveHeight={false}
		  speed={400}
		  useCSS
		  autoplay={false}
		  slidesToShow={3}
		  slidesToScroll={0}
		  centerMode={false}
		  infinite={false}
		  focusOnSelect={false}
		  swipeToSlide={false}
		  dots={false}
		  responsive={[
		    { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, focusOnSelect: true, swipeToSlide: true, infinite: true, dots: true } },
		    { breakpoint: 1240, settings: { slidesToShow: 2, slidesToScroll: 1, focusOnSelect: true, swipeToSlide: true, infinite: true } },
		  ]}
		>
			{testimonials
			  .map((testimonial, idx) => (
					<div className={css.testimonialContainer} key={idx}>
						<div className={css.testimonial}>
							<Testimonial testimonial={Immutable.Map(testimonial)} showLink={showLink} />
						</div>
					</div>
			  ))
			}
		</Carousel>
	</div>
)

TestimonialCarousel.propTypes = {
  testimonials: PropTypes.array,
  showLink: PropTypes.bool,
}

TestimonialCarousel.defaultProps = {
  showLink: true,
}

export default TestimonialCarousel
