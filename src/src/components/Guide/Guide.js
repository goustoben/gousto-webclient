import PropTypes from 'prop-types'
import React from 'react'
import { P } from 'Page/Elements'
import { ModuleTitle } from '../../routes/Home/ModuleTitle'
import css from './Guide.css'
import { Panel } from './Panel'

const Guide = ({ steps, header, description, graphicType }) => (
  <div className={css.container}>
    <ModuleTitle title={header} />
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
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  steps: PropTypes.array,
  graphicType: PropTypes.string,
}

Guide.defaultProps = {
  steps: [],
}

export default Guide
