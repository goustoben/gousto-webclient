import PropTypes from 'prop-types'
import React from 'react'
import { checkoutConfig } from 'config/checkout'
import {
  FontWeight,
  Space,
  Text,
  Button,
  ButtonColorVariant,
  Box,
} from '@gousto-internal/citrus-react'
import { Alert } from '../Alert'

export const ErrorMessage = ({ errorType, onLoginClick }) => {
  if (!errorType) {
    return null
  }

  const handleLoginClick = (e) => {
    e.preventDefault()
    onLoginClick(e)
  }

  const { errorMessage } = checkoutConfig
  const messageObject = errorMessage[errorType] || errorMessage.generic
  const { header, message, showLoginCTA } = messageObject

  const getCtaButton = () => (
    <Button
      colorVariant={ButtonColorVariant.Secondary}
      onClick={handleLoginClick}
      width="100%"
      height="3rem"
    >
      <Text size={1} fontWeight={FontWeight.Bold}>
        Log in
      </Text>
    </Button>
  )

  return (
    <>
      <Box data-testing={`${errorType}`}>
        <Alert ctaButton={showLoginCTA && getCtaButton()}>
          {header && <Text fontWeight={FontWeight.Bold}>{header}</Text>}
          <Text>{message}</Text>
          <Space size={4} />
        </Alert>
      </Box>
      <Space size={6} />
    </>
  )
}

ErrorMessage.propTypes = {
  errorType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoginClick: PropTypes.func,
}

ErrorMessage.defaultProps = {
  errorType: null,
  onLoginClick: () => {},
}
