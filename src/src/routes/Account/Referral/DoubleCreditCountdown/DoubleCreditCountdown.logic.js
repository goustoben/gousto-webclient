import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { DoubleCreditCountdownPresentation } from './DoubleCreditCountdown.presentation'

const propTypes = {
  description: PropTypes.string.isRequired,
  expiry: PropTypes.string.isRequired,
}

class DoubleCreditCountdown extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0, 
    }
    this.updateTime = this.updateTime.bind(this)
  }

  componentDidMount() {
    this.updateTime()
    const intervalId = setInterval(this.updateTime, 60000)
    this.setState({intervalId: intervalId})
  }
 
  componentWillUnmount() {
    const { intervalId } = this.state
    clearInterval(intervalId)
  }
 
  updateTime() {
    const { expiry } = this.props
    const expiryMoment = moment(expiry)
    const timeDiff = expiryMoment.diff(moment())
    const diffDuration = moment.duration(timeDiff)
    this.setState({days: diffDuration.days()}) 
    this.setState({hours: diffDuration.hours()}) 
    this.setState({minutes: diffDuration.minutes()}) 
  }

  render () {
    const { description } = this.props
    const { days, hours, minutes } = this.state

    return <DoubleCreditCountdownPresentation title={description} days={days} hours={hours} minutes={minutes}/>
  }
}

DoubleCreditCountdown.propTypes = propTypes

export { DoubleCreditCountdown }