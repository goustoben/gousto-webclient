import { ResponsiveValue } from '@gousto-internal/citrus-react/dist/types/theme/types'

import { TableItemType, Currency } from 'routes/Home/PriceComparisonTable/enums'
import { TableItemData } from 'routes/Home/PriceComparisonTable/types'

import { formatPriceText } from './utils'

export const TABLE_DATA: TableItemData[] = [
  {
    id: 'Gousto',
    type: TableItemType.Gousto,
    currency: Currency.PoundSterling,
    price: 38.61,
    priceDescription: 'Per box',
    priceDiff: 0,
    priceText: formatPriceText,
  },
  {
    id: 'HelloFresh',
    type: TableItemType.HelloFresh,
    currency: Currency.PoundSterling,
    price: 41.68,
    priceDescription: 'Per box',
    priceDiff: 3.07,
    priceText: formatPriceText,
  },
  {
    id: 'MindfulChef',
    type: TableItemType.MindfulChef,
    currency: Currency.PoundSterling,
    price: 61.37,
    priceDescription: 'Per box',
    priceDiff: 22.76,
    priceText: formatPriceText,
  },
]

export const welcomeSectionTexts = {
  heading: 'The UK’s best value recipe box**',
  subheading: 'Wondering how our prices compare to other recipe box brands? Look no further.',
}

export const CTAText = {
  discountText: 'Get started with 60% off',
  authedText: 'Get started',
}

export const comparisonTableTexts = {
  tableHeading: 'Comparison of average prices',
  tableFooter:
    'Based on average prices of a 4 recipe 2 person box for all available meals, includes delivery fees and premium recipe surcharges. Read full details:',
  tableFooterLink: {
    text: 'Value verification',
    href: 'https://cook.gousto.co.uk/value/',
  },
}

export const BLOCK_WIDTH_LIST: ResponsiveValue<string> = ['21.5rem', '36.5rem', '50%', '50%']
