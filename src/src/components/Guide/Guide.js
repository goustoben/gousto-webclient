import PropTypes from 'prop-types'
import React from 'react'
import { P } from 'Page/Elements'
import { ModuleTitle } from 'routes/Home/ModuleTitle'
import css from './Guide.css'
import { Panel } from './Panel'

const Guide = ({ steps, header, description, graphicType }) => (
  <div className={css.container}>
    <ModuleTitle title={header} />
    <P className={css.description}>{description}</P>
    <div className={css.panels}>
      {steps.map((step) => (
        <Panel
          key={step.title}
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
  description: PropTypes.node,
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    description: PropTypes.string,
  })),
  graphicType: PropTypes.oneOf(['img', 'svg']),
}

Guide.defaultProps = {
  header: null,
  description: null,
  steps: [],
  graphicType: 'img',
}

export default Guide
