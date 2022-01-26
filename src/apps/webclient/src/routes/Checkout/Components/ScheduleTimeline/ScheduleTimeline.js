import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import typography from 'design-language/typography.module.css'
import css from './ScheduleTimeline.module.css'

export const ScheduleTimeline = ({ eventsList }) => (
  <div className={css.container}>
    {eventsList.map(({ id, meta, body }) => (
      <div className={css.event} key={id}>
        <div className={css.eventMeta}>
          {meta.label ? (
            <div className={css.eventMetaLabel}>{meta.label}</div>
          ) : (
            <Fragment>
              <div className={css.eventMetaHead}>{meta.head}</div>
              <div className={css.eventMetaBody}>
                <span className={css.eventBodyDate}>{meta.date}</span>
                <small className={typography.fontStyleXS}>{meta.day}</small>
              </div>
            </Fragment>
          )}
        </div>
        <div className={css.eventBody}>
          <h3 className={css.eventTitle}>{body.title}</h3>
          <p className={css.eventDetails}>{body.details}</p>
        </div>
      </div>
    ))}
  </div>
)

ScheduleTimeline.propTypes = {
  eventsList: PropTypes.arrayOf(PropTypes.object),
}

ScheduleTimeline.defaultProps = {
  eventsList: [],
}
