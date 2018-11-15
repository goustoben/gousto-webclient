import Helmet from 'react-helmet'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { client as routes } from 'config/routes'
import { Error } from './components/Error'
import css from './GetHelp.css'

const skipFetchByRoute = ({ pathname }) => ([
  `${routes.getHelp.index}/${routes.getHelp.contact}`,
  `${routes.getHelp.index}/${routes.getHelp.confirmation}`,
].includes(pathname))

const getOrderId = ({ location }) => {
  const { query } = location

  return (query && query.orderId)
    ? query.orderId
    : null
}

const propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      orderId: PropTypes.string,
    }),
  }),
  children: PropTypes.node.isRequired,
  content: PropTypes.shape({
    button1: PropTypes.string,
    errorBody: PropTypes.string,
    infoBody: PropTypes.string,
    title: PropTypes.string,
  }),
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    recipeItems: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  storeGetHelpOrderId: PropTypes.func.isRequired,
  userLoadOrder: PropTypes.func.isRequired,
  recipesLoadRecipesById: PropTypes.func.isRequired,
  didRequestError: PropTypes.bool.isRequired,
  isRequestPending: PropTypes.bool.isRequired,
}

class GetHelp extends PureComponent {
  constructor(props) {
    super(props)

    this.orderId = getOrderId(this.props)
  }

  componentDidMount() {
    const { location } = this.props
    const skipFetch = skipFetchByRoute(location)

    if (!this.orderId || skipFetch ) {
      return null
    }

    const { storeGetHelpOrderId, userLoadOrder } = this.props

    storeGetHelpOrderId(this.orderId)

    return userLoadOrder(this.orderId).then(this.orderLoadComplete)
  }

  orderLoadComplete = () => {
    const { order, recipesLoadRecipesById } = this.props

    recipesLoadRecipesById(order.recipeItems)
  }

  render() {
    const { children, content, didRequestError, location, isRequestPending } = this.props
    const hasError = !this.orderId || didRequestError
    const skipFetch = skipFetchByRoute(location)

    return (
      <div className={css.getHelpContainer}>
        <Helmet
          style={[{
            cssText: '#react-root { height: 100%; }',
          }]}
        />
        <div className={css.getHelpContent}>
          {!isRequestPending &&
            <Error
              content={content}
              hasError={(skipFetch) ? false : hasError}
            >
              {children}
            </Error>}
        </div>
      </div>
    )
  }
}

GetHelp.propTypes = propTypes

export default GetHelp
