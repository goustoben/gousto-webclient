import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Color,
  BorderStyle,
  Icon,
  IconVariant,
  FlexDirection,
  Space,
} from '@gousto-internal/citrus-react'

export const Alert = ({ ctaButton, children }) => (
  <Box
    bg={Color.Error_50}
    borderRadius={2}
    borderWidth={0.5}
    borderStyle={BorderStyle.Solid}
    borderColor={Color.Error_800}
    display="flex"
    flexDirection={FlexDirection.Column}
    paddingV={4}
    paddingH={4}
  >
    <Box display="flex" flexDirection={FlexDirection.Row}>
      <Icon name="error" variant={IconVariant.Error} />
      <Space size={2} direction="horizontal" />
      <Box>{children}</Box>
    </Box>

    {ctaButton}
  </Box>
)

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  ctaButton: PropTypes.node,
}

Alert.defaultProps = {
  ctaButton: null,
}
