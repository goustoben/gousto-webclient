import {
  Box,
  Link,
  Text,
  Space,
  Color,
  TextAlign,
  JustifyContent,
} from '@gousto-internal/citrus-react'
import React from 'react'
import configRoutes from 'config/routes'
import { checkoutConfig } from 'config/checkout'
// import Link from 'Link'
import css from './TermsAndConditions.css'

export const TermsAndConditions = () => (
  <>
    <div className={css.termsAndConditions}>
      <span>{checkoutConfig.terms}</span>
      <br />
      <Link
        to={configRoutes.client.termsAndConditions}
        className={css.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        Terms and Conditions
      </Link>
    </div>

    <Box display="flex" flexDirection="column" justifyContent={JustifyContent.Center}>
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
  </>
)
