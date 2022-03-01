import {
  Box,
  Link,
  Text,
  Space,
  Color,
  JustifyContent,
  AlignItems,
} from '@gousto-internal/citrus-react'
import React from 'react'
import configRoutes from 'config/routes'
import { checkoutConfig } from 'config/checkout'
// import Link from 'Link'
import css from './TermsAndConditions.css'

export const TermsAndConditions = () => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent={JustifyContent.Center}
    alignItems={AlignItems.Center}
  >
    <Space size={[4, 6]} direction="vertical" />
    <Text size={0}>{checkoutConfig.terms}</Text>
    <Text>
      <Link
        href={configRoutes.client.termsAndConditions}
        color={Color.Secondary_400}
        target="_blank"
      >
        Terms and Conditions
      </Link>
    </Text>
  </Box>
)
