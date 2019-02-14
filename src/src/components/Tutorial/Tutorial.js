import { cloneElement, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { isElementHidden } from 'Tutorial/helpers'
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

  constructor(props) {
    super(props)
    const { children } = props
    const visibleChildren = children.filter(
      child => !isElementHidden(child.props.selector)
    )
    this.state = {
      children: visibleChildren,
      step: 0,
      hide: false,
    }
  }

  close = () => {
    this.setState({
      hide: true,
    })
  }

  next = () => {
    const { step, children } = this.state

    if (step === children.length - 1) {
      this.close()
    } else {
      this.setState({
        step: step + 1,
      })
    }
  }

  render() {
    const { children, step, hide } = this.state

    return (hide) ? null : (
      cloneElement(children[step], {
        last: step === (children.length - 1),
        onClose: this.close,
        next: this.next,
      })
    )
  }
}
