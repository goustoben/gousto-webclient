import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Notification } from './Notification'
import { Section } from './Section'
import { Cookbook } from './Cookbook'
import { Header } from './Header'

class MyGousto extends React.PureComponent {
  static propTypes = {
    userLoadOrders: PropTypes.func.isRequired,
    card: PropTypes.instanceOf(Immutable.Map),
    orders: PropTypes.instanceOf(Immutable.Map),
    nameFirst: PropTypes.string,
  }

  static defaultProps = {
    userLoadOrders: () => { },
  }

  componentDidMount() {
    const { userLoadOrders } = this.props
    userLoadOrders()
  }

  render() {
    const { card, orders, nameFirst } = this.props
    const headerTitle = `Hello ${nameFirst},`

    return (
      <div>
        <Section>
          <Notification card={card} orders={orders} />
        </Section>
        <Section title={headerTitle} largeTitle>
          <Header orders={orders} />
        </Section>
        <Section title="Your recent cookbook" alternateColour>
          <Cookbook />
        </Section>
      </div>
    )
  }
}

export default MyGousto
