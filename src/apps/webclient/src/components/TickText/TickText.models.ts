import {
  AlignItems,
  JustifyContent,
  SpaceScale,
  FontWeight,
  TextAlign,
} from '@gousto-internal/citrus-react'

export type TickTextProps = {
  highlightedText?: string
  ordinaryText?: string
  justifyContent?: JustifyContent
  alignItems?: AlignItems
  fontWeight?: FontWeight
  tickPadding?: SpaceScale
  maxWidth?: string
  textAlign?: TextAlign
}
