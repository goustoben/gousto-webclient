import React from 'react'

import { Text, FontFamily } from '@gousto-internal/citrus-react'

import { useGetDeliveryData } from './deliveryDateHooks'

export const DeliveryDate = () => {
  const { formattedDate, formattedSlots } = useGetDeliveryData()

  return (
    <>
      <Text fontFamily={FontFamily.SemiBold} size={1}>
        {formattedDate}
      </Text>
      <Text fontFamily={FontFamily.UI} size={2}>
        {formattedSlots.toUpperCase()}
      </Text>
    </>
  )
}
