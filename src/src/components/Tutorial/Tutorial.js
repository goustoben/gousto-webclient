import { cloneElement, PureComponent, Children } from 'react'
import PropTypes from 'prop-types'

import { isElementHidden } from 'Tutorial/helpers'
import { Step } from './Step'

export class Tutorial extends PureComponent {
  constructor(props) {
    super(props)
    const { children } = props

    const visibleChildren = Children.toArray(children).filter(
      child => !isElementHidden(child.props.selector)
    )

    this.state = {
      children: visibleChildren,
      step: 0,
      hide: Boolean(!visibleChildren.length),
    }
  }

  componentDidMount() {
    const { trackStepViewed } = this.props
    const { step } = this.state
    trackStepViewed(step)
  }

  close = () => {
    const { onClose } = this.props
    const { step } = this.state

    if (onClose) {
      onClose(step)
    }
    this.setState({
      hide: true,
    })
  }

  next = () => {
    const { trackStepViewed } = this.props
    const { step, children } = this.state

    if (step === children.length - 1) {
      this.close()
    } else {
      this.setState({
        step: step + 1,
      }, () => {
        trackStepViewed(step + 1)
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

Tutorial.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.instanceOf(Step)
  ),
  onClose: PropTypes.func,
  trackStepViewed: PropTypes.func.isRequired,
}

Tutorial.defaultProps = {
  children: [],
  onClose: null,
}
