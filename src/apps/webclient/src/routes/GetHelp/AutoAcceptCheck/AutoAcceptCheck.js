import React, { useEffect } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { LoadingWrapper } from '../LoadingWrapper'

const AutoAcceptCheck = ({
  createComplaint,
  isAutoAccept,
  loadRefundAmount,
}) => {
  useEffect(() => {
    loadRefundAmount()
  }, []) //eslint-disable-line

  useEffect(() => {
    if (isAutoAccept) {
      createComplaint(isAutoAccept)
    }

    // strict checking, as isAutoAccept can also be `null`
    if (isAutoAccept === false) {
      browserHistory.push(`${client.getHelp.index}/${client.getHelp.refund}`)
    }
  }, [isAutoAccept, createComplaint])

  return (
    <LoadingWrapper />
  )
}

AutoAcceptCheck.propTypes = {
  createComplaint: PropTypes.func.isRequired,
  isAutoAccept: PropTypes.bool,
  loadRefundAmount: PropTypes.func.isRequired,
}

AutoAcceptCheck.defaultProps = {
  isAutoAccept: null,
}

export {
  AutoAcceptCheck
}
