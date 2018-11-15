import Helmet from 'react-helmet'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { client as routes } from 'config/routes'
import { Error } from './components/Error'
import css from './GetHelp.css'

const skipErrorByRoute = ({ pathname }) => ([
  `${routes.getHelp.index}/${routes.getHelp.contact}`,
  `${routes.getHelp.index}/${routes.getHelp.confirmation}`,
].includes(pathname))

const getOrderId = ({ location }) => {
  const orderId = location && location.query && location.query.orderId
    ? location.query.orderId
    : null

  return orderId
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

  orderId = getOrderId(this.props)

  componentDidMount() {
    const { location } = this.props
    const skipErrorPage = skipErrorByRoute(location)

    if (!this.orderId || skipErrorPage ) {
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
    const skipErrorPage = skipErrorByRoute(location)
    const hasError = (skipErrorPage) ? false : (!this.orderId || didRequestError)
    const isPending = (skipErrorPage) ? false : isRequestPending

    return (
      <div className={css.getHelpContainer}>
        <Helmet
          style={[{
            cssText: '#react-root { height: 100%; }',
          }]}
        />
        <div className={css.getHelpContent}>
          {!isPending &&
            <Error
              content={content}
              hasError={hasError}
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
