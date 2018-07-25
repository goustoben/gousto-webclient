import React from 'react'
import css from './Testimonial.css'
import Svg from 'Svg'
import Immutable from 'immutable' /* eslint-disable new-cap */
import nl2br from 'react-nl2br'

const Testimonial = ({ testimonial, showLink }) => (
	<div className={css.testimonial}>
		<div className={css.author}>{testimonial.get('author')}</div>
		<div className={css.stars}>
			<Svg fileName="icon-5-stars-trustpilot" className={css.starIcons} />
		</div>
		<div className={css.title}>
			{showLink &&
				<a href={testimonial.get('url')} className={css.link} target="_blank">
					{testimonial.get('title')}
				</a>
			}
			{!showLink &&
				testimonial.get('title')
			}
		</div>
		<div className={css.body}>{nl2br(testimonial.get('body'))}</div>
	</div>
)

Testimonial.propTypes = {
	testimonial: React.PropTypes.instanceOf(Immutable.Map),
	showLink: React.PropTypes.bool,
}

Testimonial.defaultProps = {
	showLink: true,
}

export default Testimonial
