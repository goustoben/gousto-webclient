import PropTypes from 'prop-types'
import React from 'react'
import Svg from 'Svg'
import Immutable from 'immutable'
import nl2br from 'react-nl2br'
import css from './Testimonial.css'

const Testimonial = ({ testimonial, showLink }) => (
  <div className={css.testimonial}>
    <div className={css.author}>{testimonial.get('author')}</div>
    <div className={css.stars}>
      <Svg fileName="icon-5-stars-trustpilot" className={css.starIcons} />
    </div>
    <div className={css.title}>
      {showLink && (
<a href={testimonial.get('url')} className={css.link} target="_blank" rel="noopener noreferrer">
          {testimonial.get('title')}
        </a>
      )}
      {!showLink &&
        testimonial.get('title')
      }
    </div>
    <div className={css.body}>{nl2br(testimonial.get('body'))}</div>
  </div>
)

Testimonial.propTypes = {
  testimonial: PropTypes.instanceOf(Immutable.Map),
  showLink: PropTypes.bool,
}

Testimonial.defaultProps = {
  showLink: true,
}

export default Testimonial
