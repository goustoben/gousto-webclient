import React, { Children, cloneElement, Component } from 'react'
import AirbnbPropTypes from 'airbnb-prop-types'
import css from './CollectionsNavigation.module.css'

const propTypes = {
  children: AirbnbPropTypes.componentWithName('CollectionsNavigationItem').isRequired,
}

class CollectionsNavigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeElement: null,
    }
  }

  setActive = (index) => {
    this.setState({ activeElement: index })
  }

  isActive = (index, isActive) => {
    const { activeElement } = this.state

    if ((activeElement === null && isActive) || (activeElement === index)) {
      return true
    }

    return false
  }

  render() {
    const { children } = this.props

    return (
      <nav>
        <ul className={css.listWrapper}>
          {
            Children.map(children, (child, index) => (
              <li className={css.listItem}>
                {cloneElement(child, {
                  isActive: this.isActive(index, child.props.isActive),
                  index,
                  setActive: this.setActive,
                })}
              </li>
            ))
          }
        </ul>
      </nav>
    )
  }
}

CollectionsNavigation.propTypes = propTypes

export {
  CollectionsNavigation,
}
