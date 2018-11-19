import Helmet from 'react-helmet'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Error } from './components/Error'
import css from './GetHelp.css'

const propTypes = {
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
  orderId: PropTypes.string.isRequired,
  recipesLoadRecipesById: PropTypes.func.isRequired,
  didRequestError: PropTypes.bool.isRequired,
  isRequestPending: PropTypes.bool.isRequired,
  storeGetHelpOrderId: PropTypes.func.isRequired,
  userLoadOrder: PropTypes.func.isRequired,
  validateLatestOrder: PropTypes.func.isRequired,
}

class GetHelp extends PureComponent {

  componentDidMount = async () => {
    const { storeGetHelpOrderId, orderId, user, userLoadOrder, validateLatestOrder } = this.props

    if (orderId.length < 1) {
      return null
    }

    try {
      await validateLatestOrder({
        accessToken: user.accessToken,
        costumerId: user.id,
        orderId: orderId,
      })

    } catch (error) {
      /* eslint-disable no-console */
      console.log('errpr', error)
      /* eslint-enable no-console */

      return null
    }

    storeGetHelpOrderId(orderId)

    return userLoadOrder(orderId).then(this.orderLoadComplete)
  }

  orderLoadComplete = () => {
    const { order, recipesLoadRecipesById } = this.props

    recipesLoadRecipesById(order.recipeItems)
  }

  render() {
    const { children, content, didRequestError, isRequestPending } = this.props

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
              hasError={didRequestError}
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
