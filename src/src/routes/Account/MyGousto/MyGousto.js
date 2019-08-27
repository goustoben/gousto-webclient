import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Notification } from './Notification'
import { Section } from './Section'
import { Cookbook } from './Cookbook'

class MyGousto extends React.PureComponent {
  static propTypes = {
    userLoadOrders: PropTypes.func.isRequired,
    card: PropTypes.instanceOf(Immutable.Map),
    orders: PropTypes.instanceOf(Immutable.Map),
  }

  static defaultProps = {
    userLoadOrder: () => { },
  }

  componentDidMount() {
    const { userLoadOrders } = this.props
    userLoadOrders()
  }

  render() {
    const { card, orders } = this.props

    return (
      <div>
        <Section>
          <Notification card={card} orders={orders} />
        </Section>
        <Section title="Hello world" largeTitle>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
          the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Section>
        <Section title="Your recent cookbook" alternateColour>
          <Cookbook />
        </Section>
      </div>
    )
  }
}

export default MyGousto
