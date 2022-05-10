import React from 'react'
import {
  Box,
  Text,
  FontWeight,
  Image,
  Space,
  Color,
  Display,
  JustifyContent,
  BorderStyle,
  GridDisplay,
  AspectRatio,
} from '@gousto-internal/citrus-react'
import { formatPrice } from 'utils/format'
import timeFormat from 'utils/timeFormat'

import type { OrderState } from '../../../types'

interface ImageSource {
  // eslint-disable-next-line react/no-unused-prop-types
  src?: string
  // eslint-disable-next-line react/no-unused-prop-types
  alt: string
}

interface OrderDetailsProps {
  deliveryDate: Date
  recipeImages?: ImageSource[]
  price?: number
  orderState?: OrderState
  maxRecipiesCount?: number
  deliveryStartTime?: string
  deliveryEndTime?: string
}

/**
 * Default number of recipe slots rendered in a single row
 */
const DEFAULT_MAX_RECIPIE_NUMBER = 4

const ORDER_STATE_TO_COLOR_MAPPING: Record<OrderState, Color> = {
  cancelled: Color.Primary_500,
  confirmed: Color.Success_500,
  delivered: Color.Success_500,
  dispatched: Color.Success_500,
  'menu open': Color.Warning_500,
  'recipes chosen': Color.Success_500,
  scheduled: Color.Success_500,
}

const RecipeImageBox = ({ src, alt }: ImageSource) => (
  <AspectRatio ratio={1}>
    {src ? (
      <Image src={src} alt={alt} />
    ) : (
      <Box borderStyle={BorderStyle.Dashed} borderColor={Color.ColdGrey_400} borderWidth={0.5}>
        {' '}
      </Box>
    )}
  </AspectRatio>
)

const OrderDetails: React.FC<OrderDetailsProps> = (props: OrderDetailsProps) => {
  const {
    deliveryDate,
    deliveryStartTime,
    deliveryEndTime,
    orderState,
    price,
    recipeImages = [],
    maxRecipiesCount = DEFAULT_MAX_RECIPIE_NUMBER,
  } = props
  const formattedPrice = formatPrice(price)
  const formattedDeliveryDate = timeFormat(deliveryDate, 'day')
  const formattedStartTime = timeFormat(deliveryStartTime, 'hour')
  const formattedEndTime = timeFormat(deliveryEndTime, 'hour')
  const limitedRecipeImages = recipeImages.slice(0, maxRecipiesCount)

  return (
    <>
      {/* Delivery date & Price */}
      <Box display={Display.Flex} justifyContent={JustifyContent.SpaceBetween}>
        <Text fontWeight={FontWeight.Bold} data-testid="delivery-date">
          {formattedDeliveryDate}
        </Text>
        {price ? (
          <Text fontWeight={FontWeight.Bold} data-testid="price">
            {formattedPrice}
          </Text>
        ) : null}
      </Box>

      {/* Order state */}
      {orderState ? (
        <Text
          capitalise
          size={1}
          fontWeight={FontWeight.Bold}
          color={ORDER_STATE_TO_COLOR_MAPPING[orderState]}
          data-testid="order-state"
        >
          {orderState}
        </Text>
      ) : null}

      {/* Delivery Time */}
      {deliveryStartTime && deliveryEndTime ? (
        <Text size={1} data-testid="delivery-time">
          {`${formattedStartTime} - ${formattedEndTime}`}
        </Text>
      ) : null}

      <Space size={3} />

      {/* Recipies */}
      <Box
        gridTemplateColumns={`repeat(${maxRecipiesCount}, 1fr)`}
        display={GridDisplay.Grid}
        gap="8px"
        data-testid="recipe-list"
      >
        {limitedRecipeImages.map(({ src, alt }: ImageSource, i: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <RecipeImageBox key={`${src}-${i}`} src={src} alt={alt} />
        ))}
        {Array.from(new Array(maxRecipiesCount - limitedRecipeImages.length), (_, i: number) => (
          <RecipeImageBox key={i} alt="Recipe image" />
        ))}
      </Box>
      <Space size={3} />
    </>
  )
}

export { OrderState, OrderDetails }
