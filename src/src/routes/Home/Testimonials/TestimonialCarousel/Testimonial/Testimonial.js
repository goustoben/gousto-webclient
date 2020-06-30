import PropTypes from 'prop-types'
import React from 'react'
import Svg from 'Svg'
import Immutable from 'immutable'
import nl2br from 'react-nl2br'
import classNames from 'classnames'
import typography from 'design-language/typography.css'
import css from './Testimonial.css'

const Testimonial = ({ testimonial, showLink, isHomePageRedesignEnabled }) => (
  <div className={classNames(css.testimonial, { [css.homepageRedesign]: isHomePageRedesignEnabled })}>
    <div className={classNames(css.author, { [typography.fontStyleBody]: isHomePageRedesignEnabled })}>{testimonial.get('author')}</div>
    <div className={css.stars}>
      <Svg fileName="icon-5-stars-trustpilot" className={css.starIcons} />
    </div>
    <div className={classNames(css.title, { [typography.fontStyleM]: isHomePageRedesignEnabled })}>
      {showLink && (
        <a href={testimonial.get('url')} className={css.link} target="_blank" rel="noopener noreferrer">
          {testimonial.get('title')}
        </a>
      )}
      {!showLink
        && testimonial.get('title')}
    </div>
    <div className={classNames(css.body, { [typography.fontStyleBody]: isHomePageRedesignEnabled })}>{nl2br(testimonial.get('body'))}</div>
  </div>
)

Testimonial.propTypes = {
  testimonial: PropTypes.instanceOf(Immutable.Map),
  showLink: PropTypes.bool,
  isHomePageRedesignEnabled: PropTypes.bool,
}

Testimonial.defaultProps = {
  showLink: true,
  isHomePageRedesignEnabled: false,
}

export default Testimonial
