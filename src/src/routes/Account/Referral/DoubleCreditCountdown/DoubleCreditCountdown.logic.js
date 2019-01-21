import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getTimeDifference, isTimeInPast, isTimeZero } from '../timeHelper'
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
    this.setInitialTime()
    const intervalId = setInterval(this.updateTime, 60000)
    this.setState({intervalId: intervalId})
  }
 
  componentWillUnmount() {
    const { intervalId } = this.state
    clearInterval(intervalId)
  }
 
  setInitialTime = () => {
    const { expiry } = this.props
    const { days, hours, minutes } = getTimeDifference(expiry)
    this.setState({ days, hours, minutes })
  }

  updateTime = () => {
    const { fetchOffer } = this.props
    const { expiry } = this.props
    const { days, hours, minutes } = getTimeDifference(expiry)
    const isJustExpired = isTimeZero(days, hours, minutes)
    this.setState({ days, hours, minutes })
    if (isJustExpired) {
      fetchOffer()
    }
  }

  render() {
    const { description } = this.props
    const { days, hours, minutes } = this.state
    const offerExpired = isTimeInPast(days, hours, minutes)

    return (offerExpired ? null : <DoubleCreditCountdownPresentation title={description} days={days} hours={hours} minutes={minutes}/>)
  }
}

DoubleCreditCountdown.propTypes = propTypes

export { DoubleCreditCountdown }