import React, { PropTypes } from 'react'
import ModuleHeader from 'ModuleHeader'
import { P } from 'Page/Elements'
import css from './Guide.css'
import Panel from './Panel'

const Guide = ({ steps, header, description, graphicType }) => (
	<div className={css.container}>
		<ModuleHeader>{header}</ModuleHeader>
		<P className={css.description}>{description}</P>
		<div className={css.panels}>
			{steps.map((step, index) => (
				<Panel
					key={index}
					path={step.path}
					graphicType={graphicType}
					title={step.title}
					description={step.description}
				/>
			))}
		</div>
	</div>
)

Guide.propTypes = {
	header: PropTypes.string,
	description: PropTypes.string,
	steps: PropTypes.array,
	graphicType: PropTypes.string,
}

Guide.defaultProps = {
	steps: [],
}

export default Guide
