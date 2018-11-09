import React from 'react'
import Svg from 'Svg'
import css from './Values.css'
import jobs2 from 'config/jobs'
import Content from 'containers/Content'

const Values = () => (
	<div className={css.container}>
		<div>
			<h1 className={css.header}>
				<Content
				  contentKeys="jobsValuesHeaderTitle"
				>
					<span>Our Ownership Principles</span>
				</Content>
			</h1>
			<p className={css.introText}>
				<Content
				  contentKeys="jobsValuesHeaderMessage"
				>
					<span>We call our three company values ‘Ownership Principles’ because all of us are responsible for the success of Gousto, and for helping each other to succeed. These principles are:</span>
				</Content>
			</p>
		</div>
		<div className={css.valueRow}>
			<div className={css.colThird}>
				<Svg fileName={jobs2.values.dream.icon} className={css.svg} />
				<h1 className={css.valueHeader}>
					<Content
					  contentKeys="jobsValuesBodyTitle1"
					>
						<span>{jobs2.values.dream.value}</span>
					</Content>
				</h1>
				<p className={css.valueListItem}>
					<Content
					  contentKeys="jobsValuesBodyMessage1"
					>
						<span>{jobs2.values.dream.copy}</span>
					</Content>
				</p>
			</div>

			<div className={css.colThird}>
				<Svg fileName={jobs2.values.deliver.icon} className={css.svg} />
				<h1 className={css.valueHeader}>
					<Content
					  contentKeys="jobsValuesBodyTitle2"
					>
						<span>{jobs2.values.deliver.value}</span>
					</Content>
				</h1>
				<p className={css.valueListItem}>
					<Content
					  contentKeys="jobsValuesBodyMessage2"
					>
						<span>{jobs2.values.deliver.copy}</span>
					</Content>
				</p>
			</div>

			<div className={css.colThird}>
				<Svg fileName={jobs2.values.care.icon} className={css.svg} />
				<h1 className={css.valueHeader}>
					<Content
					  contentKeys="jobsValuesBodyTitle3"
					>
						<span>{jobs2.values.care.value}</span>
					</Content>
				</h1>
				<p className={css.valueListItem}>
					<Content
					  contentKeys="jobsValuesBodyMessage3"
					>
						<span>{jobs2.values.care.copy}</span>
					</Content>
				</p>
			</div>
		</div>
	</div>
)

export default Values
