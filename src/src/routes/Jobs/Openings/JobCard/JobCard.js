import PropTypes from 'prop-types'
import React from 'react'
import Link from 'Link'
import classnames from 'classnames'
import config from 'config/routes'
import css from './JobCard.css'

const JobCard = ({ jobLink, isOdd, jobTitle, jobDepartment }) => (
  <Link to={jobLink} clientRouted={false} target="_blank" noDecoration >
    <div className={classnames(css.card, isOdd ? css.isOdd : css.isEven)}>
      <div>
        <div className={css.cardTitle}>
          <h2 className={css.jobTitle}>{jobTitle}</h2>
          <h2 className={css.jobDepartment}>{jobDepartment}</h2>
        </div>
        <div className={css.cardCTA}>
          <div to={jobLink} className={css.jobCTA} clientRouted={false} target="_blank" >
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
  jobLink: PropTypes.string,
}

JobCard.defaultProps = {
  isOdd: false,
  jobTitle: 'Frontend Engineer',
  jobDepartment: 'Tech',
  jobLink: config.workable.link,
}

export default JobCard
