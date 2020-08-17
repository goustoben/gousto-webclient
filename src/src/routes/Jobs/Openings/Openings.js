import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Link from 'Link'
import Content from 'containers/Content'
import css from './Openings.css'
import { JobCard } from './JobCard'

class Openings extends React.PureComponent {
  componentDidMount() {
    const { fetchOpenJobs } = this.props

    fetchOpenJobs()
  }

  renderJobItems = () => {
    const { jobs } = this.props
    const jobPositions = jobs.keySeq().toArray()

    return jobs.valueSeq().map((job) => (
      <div key={job.get('id')}>
        <JobCard
          jobTitle={job.get('title')}
          jobDepartment={job.get('department')}
          jobLink={job.get('url')}
          isOdd={!!((jobPositions.indexOf(job.get('id'))) % 2)}
        />
      </div>
    ))
  }

  renderNoJobs = () => {
    const { selectedDepartment } = this.props
    const departmentString = `in ${selectedDepartment}`

    return (
      <div className={css.jobContainer}>
        <p className={css.noJobsText}>
          {`
            There are no job openings
            ${selectedDepartment.toLowerCase() === 'all' ? '' : departmentString}
            right now, but we’re always on the lookout for amazing new people! If you think this could be the team for you, email us at
          `}
          <Link to="mailto:jobs@gousto.co.uk" clientRouted={false}>
            jobs@gousto.co.uk
          </Link>
          {' with your cover letter and CV.'}
        </p>
      </div>
    )
  }

  renderDeptItems = () => {
    const { depts, selectedDepartment, selectDepartment } = this.props

    return depts.map((dept) => (
      <div
        key={dept}
        className={selectedDepartment === dept ? css.activeJobSelector : css.jobSelector}
        onClick={() => selectDepartment(dept)}
        onKeyUp={() => selectDepartment(dept)}
        role="button"
        tabIndex="0"
      >
        <p className={css.jobSelectorText}>{dept}</p>
      </div>
    ))
  }

  render() {
    const { jobs } = this.props

    return (
      <div className={css.background}>
        <div className={css.container} id="openings">
          <div>
            <h2 className={css.preHeader}>
              <Content
                contentKeys="jobsOpeningsHeaderPretitle"
              >
                <span>Join us</span>
              </Content>
            </h2>
            <h1 className={css.header}>
              <Content
                contentKeys="jobsOpeningsHeaderTitle"
              >
                <span>Job Openings</span>
              </Content>
            </h1>
          </div>
          <div className={css.deptContainer}>
            {this.renderDeptItems()}
          </div>
          <div className={css.jobContainer}>
            {jobs.size ? this.renderJobItems() : this.renderNoJobs()}
          </div>
        </div>
      </div>
    )
  }
}

Openings.propTypes = {
  jobs: PropTypes.instanceOf(Immutable.Map),
  depts: PropTypes.arrayOf(PropTypes.string),
  selectDepartment: PropTypes.func,
  fetchOpenJobs: PropTypes.func.isRequired,
  selectedDepartment: PropTypes.string,
}

Openings.defaultProps = {
  jobs: {},
  depts: ['All', 'Tech'],
  selectDepartment: () => {},
  selectedDepartment: 'All',
}

Openings.contextTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export { Openings }
