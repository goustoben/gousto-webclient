import { cloneElement, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Step } from './Step'

export class Tutorial extends PureComponent {
  static propTypes = {
    children: PropTypes.arrayOf(
      PropTypes.instanceOf(Step)
    ),
  }

  static defaultProps = {
    children: [],
  }

  state = {
    step: 0,
    hide: false,
  }

  close = () => {
    this.setState({
      hide: true,
    })
  }

  next = () => {
    const { step } = this.state
    const { children } = this.props

    if (step === children.length - 1) {
      this.close()
    } else {
      this.setState({
        step: step + 1,
      })
    }
  }

  render() {
    const { step, hide } = this.state
    const { children } = this.props

    return (hide) ? null : (
      cloneElement(children[step], {
        last: step === (children.length - 1),
        onClose: this.close,
        onClick: this.next,
      })
    )
  }
}
