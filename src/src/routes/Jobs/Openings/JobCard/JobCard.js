import PropTypes from 'prop-types'
import React from 'react'
import Link from 'Link'
import classnames from 'classnames'
import config from 'config/routes'
import css from './JobCard.css'

const JobCard = (props) => (
	<Link to={props.jobLink} clientRouted={false} target="_blank" noDecoration >
		<div className={classnames(css.card, props.isOdd ? css.isOdd : css.isEven)}>
			<div>
				<div className={css.cardTitle}>
					<h2 className={css.jobTitle}>{props.jobTitle}</h2>
					<h2 className={css.jobDepartment}>{props.jobDepartment}</h2>
				</div>
				<div className={css.cardCTA}>
					<div to={props.jobLink} className={css.jobCTA} clientRouted={false} target="_blank" >
						Read more
					</div>
					<span className={css.chevronRight} aria-hidden="true"></span>
				</div>
			</div>
		</div>
	</Link>
)

JobCard.propTypes = {
  isOdd: PropTypes.bool,
  jobTitle: PropTypes.string,
  jobDepartment: PropTypes.string,
  jobCopy: PropTypes.string,
  jobLink: PropTypes.string,
}

JobCard.defaultProps = {
  isOdd: false,
  jobTitle: 'Frontend Engineer',
  jobDepartment: 'Tech',
  jobCopy: 'We are looking for an Agile Coach to coach and enable our development teams to work efficiently and quickly together.',
  jobLink: config.workable.link,
}

export default JobCard
