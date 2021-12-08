import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Button } from '../Button'

class ModalStoryWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  toggleModal = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  render() {
    const { children } = this.props
    const { isOpen } = this.state

    return (
      <Fragment>
        <Button role="button" onClick={this.toggleModal}>Toggle Modal</Button>
        {children({ isOpen, toggleModal: this.toggleModal })}
      </Fragment>
    )
  }
}

ModalStoryWrapper.propTypes = {
  children: PropTypes.func.isRequired,
}

export { ModalStoryWrapper }
