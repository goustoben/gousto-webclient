import PropTypes from 'prop-types'
import React from 'react'
import css from './PromoModalBody.css'

const PromoModalBody = ({ text, title, error }) => (
	<div className={css.body}>
		<h4 className={css.heading}>{title}</h4>
		{text && !error && <span dangerouslySetInnerHTML={{ __html: text }} />}
		{(() => {
		  if (error) {
		    if (error === 'Code is only applicable for new customers') {
		      return (
						<span>
							<p>The promotion you tried to use is only for new customers.</p>
						</span>
		      )
		    }

		    return (
					<span>
						<p>Something went wrong and we couldn't apply this promotion to your account.</p>
						<p>Please try again later or contact customer support at 020 3699 9996 if the problem persists.</p>
					</span>
		    )
		  }

		  return null
		})()}
	</div>
)

PromoModalBody.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  error: PropTypes.string,
}

export default PromoModalBody
