import React, { PropTypes } from 'react'
import css from './Openings.css'
import JobCard from './JobCard/JobCard'
import actions from 'actions/jobs'
import Immutable from 'immutable' /* eslint-disable new-cap */
import Link from 'Link'
import Content from 'containers/Content'

class Openings extends React.PureComponent {

	static contextTypes = {
		store: React.PropTypes.object.isRequired,
	}

	static fetchData = async ({ store }) => {
		await store.dispatch(actions.fetchOpenJobs())
	}

	componentDidMount() {
		const store = this.context.store
		Openings.fetchData({ store })
	}

	render() {
		const jobs = this.props.jobs
		const depts = this.props.depts
		const jobPositions = jobs.keySeq().toArray()
		const deptItems = depts.map((dept) =>
			<div key={dept} className={this.props.selectedDepartment === dept ? css.activeJobSelector : css.jobSelector} onClick={() => { this.props.selectDepartment(dept) }}><p className={css.jobSelectorText}>{dept}</p></div>
			)
		const jobItems = jobs.valueSeq().map((job) =>
			<div key={job.get('id')}>
				<JobCard jobTitle={job.get('title')} jobDepartment={job.get('department')} jobLink={job.get('url')} isOdd={!!((jobPositions.indexOf(job.get('id'))) % 2)} />
			</div>
		)
		const departmentString = `in ${this.props.selectedDepartment}`
		const noJobs = (
			<div className={css.jobContainer}>
				<p className={css.noJobsText}>
					{(`
						There are no job openings 
						${this.props.selectedDepartment.toLowerCase() === 'all' ? '' : departmentString}
						right now, but we’re always on the lookout for amazing new people! If you think this could be the team for you, email us at 
					`)}
					<Link to="mailto:jobs@gousto.co.uk" clientRouted={false}>
						jobs@gousto.co.uk
					</Link>
					{(`
					 with your cover letter and CV.
					`)}
				</p>
			</div>
			)

		return (
			<div className={css.background}>
				<div className={css.container} id="openings" >
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
						{deptItems}
					</div>
					<div className={css.jobContainer}>
						{jobs.size !== 0 ? jobItems : noJobs}
					</div>
				</div>
			</div>
		)
	}
}

Openings.propTypes = {
	jobs: PropTypes.instanceOf(Immutable.Map),
	depts: PropTypes.array,
	selectDepartment: PropTypes.func,
	selectedDepartment: PropTypes.string,
}

Openings.defaultProps = {
	jobs: {},
	depts: ['All', 'Tech'],
	selectDepartment: () => {},
	selectedDepartment: 'All',
}
export default Openings
