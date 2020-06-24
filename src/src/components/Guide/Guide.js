import PropTypes from 'prop-types'
import React from 'react'
import { ModuleHeaderContainer } from 'ModuleHeader'
import { P } from 'Page/Elements'
import css from './Guide.css'
import { PanelContainer } from './Panel'

const Guide = ({ steps, header, description, graphicType }) => (
  <div className={css.container}>
    <ModuleHeaderContainer>{header}</ModuleHeaderContainer>
    <P className={css.description}>{description}</P>
    <div className={css.panels}>
      {steps.map((step, index) => (
        <PanelContainer
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
