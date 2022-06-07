enum RelationshipIds {
  Box = 'box',
  DeliverySlot = 'delivery-slot',
  DeliveryDay = 'delivery-day',
  DeliverySlotLeadTime = 'delivery-slot-lead-time',
  DeliveryTariff = 'delivery-tariff',
  Ingredient = 'ingredient',
  Order = 'order',
  Period = 'period',
  Product = 'product',
  Recipe = 'recipe',
  ShippingAddress = 'shipping-address',
}

enum RelationshipKeys {
  Box = 'box',
  DeliverySlot = 'delivery_slot',
  DeliveryDay = 'delivery_day',
  DeliverySlotLeadTime = 'delivery_slot_lead_time',
  DeliveryTariff = 'delivery_tariff',
  Ingredient = 'ingredient',
  Period = 'period',
  Product = 'product',
  Recipe = 'recipe',
  ShippingAddress = 'shipping_address',
}

type Relationship = {
  data: {
    id: RelationshipIds
    type: string
    meta: Record<string, any>
  }
}

export type OrderV2 = {
  id: string
  type: RelationshipIds.Order
  relationships: Record<RelationshipKeys, Relationship>
  attributes: Record<string, any>
}
