import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { LoadingWrapper } from './LoadingWrapper'
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
  loadOrderAndRecipesByIds: PropTypes.func.isRequired,
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    recipeItems: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
  }),
  orderId: PropTypes.string.isRequired,
  didRequestError: PropTypes.bool.isRequired,
  isRequestPending: PropTypes.bool.isRequired,
  storeGetHelpOrderId: PropTypes.func.isRequired,
}

const defaultProps = {
  content: undefined,
  order: {},
  user: {},
}

class GetHelp extends PureComponent {
  componentDidMount() {
    const { loadOrderAndRecipesByIds, orderId, storeGetHelpOrderId } = this.props

    if (orderId) {
      storeGetHelpOrderId(orderId)
      loadOrderAndRecipesByIds(orderId)
    }
  }

  render() {
    const { children, content, didRequestError, isRequestPending } = this.props

    if (isRequestPending) {
      return <LoadingWrapper />
    }

    if (didRequestError) {
      return <Error content={content} />
    }

    return (
      <div className={css.getHelpWrapper}>
        {children}
      </div>
    )
  }
}

GetHelp.propTypes = propTypes
GetHelp.defaultProps = defaultProps

export {
  GetHelp
}
