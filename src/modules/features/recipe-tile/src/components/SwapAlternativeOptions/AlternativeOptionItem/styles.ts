import { CSSObject } from "@emotion/react"
import { colors, typography } from "../../../styles"

export const cssItem: CSSObject = {
  textAlign: 'left',

  '& > label': {
    marginBottom: '0',
  }
}

export const cssListItem: CSSObject = {
  ...cssItem,
  position: 'relative',
  padding: '0.325rem 0',
  border: `1px solid ${colors.mackerel}`,
  borderRadius: '3px',
  marginBottom: '0.5rem',
}

export const cssListItemChecked: CSSObject = {
  borderWidth: '2px',
  borderColor: colors.bluecheese,
}

export const cssSoldOutText: CSSObject = {
  color: colors.mackerel,
  fontWeight: '800',
  whiteSpace: 'nowrap',
}

export const cssExtraInformation: CSSObject = {
  marginLeft: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
}

export const cssSurchargeAmountText: CSSObject = {
  color: colors.blackberry,
  fontWeight: '800',
  whiteSpace: 'nowrap',
}

export const cssTitleContainer: CSSObject = {
  marginLeft: '0.5rem',
}

export const cssTitleText: CSSObject = {
  color: colors.blackberry,
}

export const cssSurchargeText: CSSObject = {
  color: colors.blackberry,
  fontWeight: '500',
  whiteSpace: 'nowrap',
  fontSize: typography.sizeSM,
}

export const cssPerServingText: CSSObject = {
  whiteSpace: 'nowrap',
  fontSize: '0.8rem',
}

export const cssLabelContainer: CSSObject = {
  cursor: 'pointer',
  margin: '0',
  display: 'flex',
  width: 'calc(100% - 0.5rem)',
  justifyContent: 'space-between',
  lineHeight: '1.3',
  marginLeft: '0.25rem',
}
