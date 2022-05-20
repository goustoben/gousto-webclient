import React from 'react'
import {
  AlignItems,
  Box,
  Color,
  colors,
  FlexDirection,
  FontWeight,
  Heading5,
  Icon,
  Image,
  JustifyContent,
  Paragraph,
  Text,
  TextAlign,
} from '@gousto-internal/citrus-react'
import { TableItemType } from 'routes/Home/PriceComparisonTable/enums'
import { TableItemData } from 'routes/Home/PriceComparisonTable/types'
import css from 'routes/Home/PriceComparisonTable/components/ComparisonTableItem/ComparisonTableItem.css'
import GoustoPNG from 'routes/Home/PriceComparisonTable/assets/Gousto.png'
import HelloFreshPNG from 'routes/Home/PriceComparisonTable/assets/HelloFresh.png'
import MindfulChefPNG from 'routes/Home/PriceComparisonTable/assets/MindfulChef.png'

interface ItemImageProps {
  type: TableItemType
}
export function ItemImage({ type }: ItemImageProps) {
  switch (type) {
    case TableItemType.Gousto:
      return <Image src={GoustoPNG} alt="gousto logo" width="100%" height="auto" />
    case TableItemType.HelloFresh:
      return <Image src={HelloFreshPNG} alt="hello fresh logo" width="100%" height="auto" />
    case TableItemType.MindfulChef:
      return <Image src={MindfulChefPNG} alt="mindful chef logo" width="100%" height="auto" />
    default:
      return <Image alt="price comparison table item logo" width="100%" height="auto" />
  }
}

interface ColorData {
  priceTextColor: Color
  badgeBackgroundColor: Color
  badgeTextColor: Color
}

const getColors = (type: TableItemType): ColorData =>
  type === TableItemType.Gousto
    ? {
        priceTextColor: Color.Success_800,
        badgeBackgroundColor: Color.Success_50,
        badgeTextColor: Color.Success_900,
      }
    : {
        priceTextColor: Color.Error_900,
        badgeBackgroundColor: Color.Error_50,
        badgeTextColor: Color.Error_900,
      }

interface Props {
  item: TableItemData
}

export function ComparisonTableItem({ item }: Props) {
  const { priceTextColor, badgeBackgroundColor, badgeTextColor } = getColors(item.type)

  return (
    <Box
      className={css.comparisonTableItem}
      display="flex"
      flexDirection={FlexDirection.Column}
      justifyContent={JustifyContent.FlexEnd}
      alignItems={AlignItems.Center}
      width={['104px', '144px', '144px', '159px']}
    >
      <Box
        display="flex"
        flexDirection={FlexDirection.Column}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
        width="100%"
        height="100%"
      >
        <Box maxWidth="96px" maxHeight="52px">
          <ItemImage type={item.type} />
        </Box>
      </Box>

      <Box paddingV={2} paddingBottom={0}>
        <Heading5 color={priceTextColor}>
          {item.currency}
          {item.price}
        </Heading5>
      </Box>

      <Paragraph color={priceTextColor} size={2} fontWeight={FontWeight.Normal}>
        {item.priceDescription}
      </Paragraph>
      {/* TODO: This should be removed in future and replaced with citrus badge */}
      {/* for citrus badge not production ready */}
      <Box
        display="flex"
        flexDirection={FlexDirection.Column}
        justifyContent={JustifyContent.Center}
        alignItems={AlignItems.Center}
        bg={badgeBackgroundColor}
        width="100%"
        minHeight="40px"
        paddingV={[1, 1, 2, 3]}
        paddingH={[2, 0, 0, 0]}
        borderRadius={1.5}
        style={{ marginTop: '16px' }}
      >
        {item.type === TableItemType.Gousto ? (
          <Box
            display="flex"
            flexDirection={FlexDirection.Row}
            justifyContent={JustifyContent.Center}
            alignItems={AlignItems.Center}
          >
            <Icon
              name="success"
              size={3}
              style={{
                color: colors[badgeTextColor],
                marginRight: '3px',
              }}
            />
            <Text
              className={css.badgeText}
              color={badgeTextColor}
              size={1}
              fontWeight={FontWeight.Bold}
            >
              Best value
            </Text>
          </Box>
        ) : (
          <Text
            className={css.badgeText}
            color={badgeTextColor}
            size={1}
            fontWeight={FontWeight.Normal}
            textAlign={TextAlign.Center}
          >
            Pay up to {item.currency}
            {item.priceDiff} more
          </Text>
        )}
      </Box>
    </Box>
  )
}
