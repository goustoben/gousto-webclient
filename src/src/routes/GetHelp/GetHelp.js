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
  loadRecipesById: PropTypes.func.isRequired,
  didRequestError: PropTypes.bool.isRequired,
  isRequestPending: PropTypes.bool.isRequired,
  storeGetHelpOrderId: PropTypes.func.isRequired,
  loadOrderById: PropTypes.func.isRequired,
}

const defaultProps = {
  content: undefined,
  order: {},
  user: {},
}

class GetHelp extends PureComponent {
  async componentDidMount() {
    const { storeGetHelpOrderId, orderId, user, loadOrderById } = this.props

    if (orderId.length < 1) {
      return null
    }

    storeGetHelpOrderId(orderId)

    try {
      await loadOrderById({
        accessToken: user.accessToken,
        orderId,
      })

      return this.orderLoadComplete()
    } catch (error) {
      return browserHistory.push(`${client.getHelp.index}/${client.getHelp.contact}`)
    }
  }

  componentDidUpdate(prevProps) {
    const { order } = this.props

    if (order && order.id && prevProps.order.id !== order.id) {
      this.orderLoadComplete()
    }
  }

  orderLoadComplete = () => {
    const { order, loadRecipesById } = this.props

    loadRecipesById(order.recipeItems)
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
GetHelp.defaultProps = defaultProps

export {
  GetHelp
}
