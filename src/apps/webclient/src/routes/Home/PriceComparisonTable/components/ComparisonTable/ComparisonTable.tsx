import React from 'react'

import {
  AlignItems,
  BorderStyle,
  Box,
  Color,
  FlexDirection,
  FontWeight,
  JustifyContent,
  Text,
  TextAlign,
} from '@gousto-internal/citrus-react'
import { useDispatch } from 'react-redux'

import { trackClickPriceComparisonTableHeader } from 'routes/Home/PriceComparisonTable/actions/trackClickPriceComparisonTableHeading'
import css from 'routes/Home/PriceComparisonTable/components/ComparisonTable/ComparisonTable.css'
import { ComparisonTableItem } from 'routes/Home/PriceComparisonTable/components/ComparisonTableItem/ComparisonTableItem'
import { comparisonTableTexts, BLOCK_WIDTH_LIST } from 'routes/Home/PriceComparisonTable/constants'
import { TableItemData } from 'routes/Home/PriceComparisonTable/types'

interface Props {
  items: TableItemData[]
}

export function ComparisonTable({ items }: Props) {
  const dispatch = useDispatch()
  const onClickTableHeading = () => dispatch(trackClickPriceComparisonTableHeader())

  return (
    <Box
      className={css.tableSection}
      width={BLOCK_WIDTH_LIST}
      paddingV={[0, 0, 10, 10]}
      paddingBottom={[0, 0, 14, 14]}
    >
      <Box
        display="flex"
        flexDirection={FlexDirection.Column}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
        borderColor={Color.Secondary_400}
        borderStyle={BorderStyle.Solid}
        borderWidth={0.5}
      >
        <Box
          data-testid="ComparisonTable_HeadingContainer"
          bg={Color.Secondary_400}
          paddingV={4}
          width="100%"
          onClick={onClickTableHeading}
        >
          <Text
            data-testid="ComparisonTable_Heading"
            fontWeight={FontWeight.SemiBold}
            textAlign={TextAlign.Center}
            color={Color.White}
            size={3}
          >
            {comparisonTableTexts.tableHeading}
          </Text>
        </Box>

        <Box
          data-testid="ComparisonTable_Content"
          className={css.tableContent}
          display="flex"
          flexDirection={FlexDirection.Row}
          justifyContent={JustifyContent.SpaceEvenly}
          alignItems={AlignItems.Stretch}
          gap="24px"
          paddingV={[3, 6, 6, 6]}
          paddingBottom={4}
          paddingH={[2, 0, 0, 0]}
        >
          {items.map((item) => (
            <ComparisonTableItem key={item.id} item={item} />
          ))}
        </Box>

        <Box
          data-testid="ComparisonTable_Footer"
          paddingV={0}
          paddingBottom={[4, 6, 6, 6]}
          paddingH={6}
          width="100%"
        >
          <Text size={1} textAlign={TextAlign.Center}>
            {comparisonTableTexts.tableFooter}
            <Text
              fontWeight={FontWeight.Bold}
              textAlign={TextAlign.Center}
              style={{ display: 'inline' }}
            >
              &nbsp;{comparisonTableTexts.tableFooterImportant}
            </Text>
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
