import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import React, { PureComponent } from 'react'
import { browserHistory } from 'react-router'

import Loading from 'Loading'
import { client } from 'config/routes'
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
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
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
      const response = await validateLatestOrder({
        accessToken: user.accessToken,
        costumerId: user.id,
        orderId: orderId,
      })

      if (response && response.data) {
        const { valid } = response.data

        if (!valid) {
          return browserHistory.push(`${client.getHelp.index}/${client.getHelp.contact}`)
        }
      } else {
        return browserHistory.push(`${client.getHelp.index}/${client.getHelp.contact}`)
      }

    } catch (error) {
      return browserHistory.push(`${client.getHelp.index}/${client.getHelp.contact}`)
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
    const contentClasses = {
      [css.getHelpContent]: true,
      [css.getHelpContent__loading]: isRequestPending,
    }

    return (
      <div className={css.getHelpContainer}>
        <Helmet
          style={[{
            cssText: '#react-root { height: 100%; }',
          }]}
        />
        <div className={classnames(contentClasses)}>
          {(isRequestPending) ? (
            <div className={css.loading__container}>
              <Loading className={css.loading__image} />
            </div>
          ) : (
            <Error content={content} hasError={didRequestError}>
              {children}
            </Error>
          )}
        </div>
      </div>
    )
  }
}

GetHelp.propTypes = propTypes

export default GetHelp
