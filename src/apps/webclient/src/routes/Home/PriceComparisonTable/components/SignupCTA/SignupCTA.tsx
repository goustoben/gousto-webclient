import React from 'react'
import {
  AlignItems,
  Box,
  Color,
  FontFamily,
  FontWeight,
  JustifyContent,
  Link,
  LinkVariant,
  Text,
  TextAlign,
} from '@gousto-internal/citrus-react'
import { client } from 'config/routes'
import css from 'routes/Home/PriceComparisonTable/components/SignupCTA/SignupCTA.css'
import { CTAText } from 'routes/Home/PriceComparisonTable/constants'

export function SignupCTA() {
  return (
    <Link className={css.signupCTA} href={client.signup} size={2} variant={LinkVariant.None}>
      <Box
        bg={Color.Secondary_400}
        paddingH={2}
        paddingV={2}
        height="48px"
        width="351px"
        borderRadius={1.5}
        alignItems={AlignItems.Center}
        justifyContent={JustifyContent.Center}
        display="flex"
        className={css.signupCTAInnerContainer}
      >
        <Text
          color={Color.White}
          size={3}
          fontWeight={FontWeight.SemiBold}
          textAlign={TextAlign.Center}
          fontFamily={FontFamily.UI}
        >
          {CTAText.discountText}
        </Text>
      </Box>
    </Link>
  )
}
