import React from 'react'
import PropTypes from 'prop-types'
import { Section } from './Section'
import { Cookbook } from './Cookbook'
import { NotificationLogic } from './Notification/NotificationLogic'

class MyGousto extends React.PureComponent {
  static propTypes = {
    userLoadOrder: PropTypes.func.isRequired
  }

  static defaultProps = {
    userLoadOrder: () => { }
  }

  componentDidMount() {
    const { userLoadOrder } = this.props
    userLoadOrder()
  }

  render() {
    const { card, orders } = this.props

    return (
      <div>
        <Section>
          <NotificationLogic card={card} userOrders={orders} />
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
