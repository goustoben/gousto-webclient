import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getTimeDifference, isTimeInPast } from '../timeHelper'
import { DoubleCreditCountdownPresentation } from './DoubleCreditCountdown.presentation'

const propTypes = {
  description: PropTypes.string.isRequired,
  expiry: PropTypes.string.isRequired,
  fetchOffer: PropTypes.func.isRequired,
}

class DoubleCreditCountdown extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      days: 0,
      hours: 0,
      minutes: 1, 
    }
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
 
  updateTime = () => {
    const { expiry } = this.props
    const { days, hours, minutes } = getTimeDifference(expiry)
    this.setState({ days, hours, minutes }) 
  }

  render() {
    const { description, fetchOffer } = this.props
    const { days, hours, minutes } = this.state
    const offerExpired = isTimeInPast(days, hours, minutes)

    if (offerExpired) {
      fetchOffer() 
    }

    return !offerExpired && <DoubleCreditCountdownPresentation title={description} days={days} hours={hours} minutes={minutes}/>
  }
}

DoubleCreditCountdown.propTypes = propTypes

export { DoubleCreditCountdown }