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

class GetHelp extends PureComponent {
  static propTypes = {
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
    didRequestError: PropTypes.bool.isRequired,
    isRequestPending: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)

    this.orderId = getOrderId(this.props)
  }

  componentDidMount() {
    const skipFetch = skipFetchByRoute(this.props.location)

    if (!this.orderId || skipFetch ) {
      return null
    }

    const { storeGetHelpOrderId, userLoadOrder } = this.props

    storeGetHelpOrderId(this.orderId)

    return userLoadOrder(this.orderId).then(this.orderLoadComplete)
  }

  orderLoadComplete = () => {
    const { orders, recipesLoadRecipesById } = this.props
    const order = orders[this.orderId]

    const recipeIds = order.recipeItems.map((recipe) => recipe.recipeId)

    recipesLoadRecipesById(recipeIds)
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

export default GetHelp
