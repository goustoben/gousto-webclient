import { ResponsiveValue } from '@gousto-internal/citrus-react/dist/types/theme/types'

import { TableItemType, Currency } from 'routes/Home/PriceComparisonTable/enums'
import { TableItemData } from 'routes/Home/PriceComparisonTable/types'

export const TABLE_DATA: TableItemData[] = [
  {
    id: 'Gousto',
    type: TableItemType.Gousto,
    currency: Currency.PoundSterling,
    price: 34.99,
    priceDescription: 'Per box',
    priceDiff: 0,
  },
  {
    id: 'HelloFresh',
    type: TableItemType.HelloFresh,
    currency: Currency.PoundSterling,
    price: 36.98,
    priceDescription: 'Per box',
    priceDiff: 1.99,
  },
  {
    id: 'MindfulChef',
    type: TableItemType.MindfulChef,
    currency: Currency.PoundSterling,
    price: 60.92,
    priceDescription: 'Per box',
    priceDiff: 25.93,
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
  tableHeading: 'Comparison of full prices',
  tableFooter: 'Based on a box of 4 recipes for 2 people at',
  tableFooterImportant: 'full price including delivery.',
}

export const BLOCK_WIDTH_LIST: ResponsiveValue<string> = ['21.5rem', '36.5rem', '50%', '50%']
