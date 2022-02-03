import React from 'react'
import PropTypes from 'prop-types'
import { Heading6, Text, Space } from '@gousto-internal/citrus-react'

export const SectionHeader = ({ title, subtitle }) => (
  <>
    <Heading6>{title}</Heading6>
    {subtitle && <Text size={1}>{subtitle}</Text>}
    <Space size={[3, 6]} />
  </>
)

SectionHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

SectionHeader.defaultProps = {
  subtitle: '',
}
