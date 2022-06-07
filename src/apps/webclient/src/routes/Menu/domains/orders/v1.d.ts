/* eslint-disable camelcase */
type Order = {
  id: number
  state: string
  phase: string
  updatedAt: string
  shouldCutoffAt: string
  whenCutoff: string
  default: boolean
  deliveryDayId: string
  deliveryDate: string
  humanDeliveryDate: string
  deliverySlotId: string
  whenLive: string
  daySlotLeadTimeId: string | null
  deliveryTariffId: string | null
  originalDeliveryDay: DeliveryDay | null
  deliverySlot: DeliverySlot
  shippingAddress: ShippingAddress
  box: Box
  period: Period
  prices: Prices
  productItems: any[]
  giftItems: GiftItem[]
  recipeItems: RecipeItem[]
  surcharges?: any[]
}

type DeliveryDay = {
  humanDate: string
  unavailableReason: any
}

type Box = {
  numPortions: string
  numRecipes: string
  sku: string
  price?: string
  boxType?: string
}

type ShippingAddress = {
  id: string
  deleted: boolean
  name: string
  companyname: string
  line1: string
  line2: string
  line3: string
  town: string
  postcode: string
  deliveryInstructions: string
  shippingDefault: boolean
  billingDefault: boolean
  county: string
}

type DeliverySlot = {
  id: string
  deliveryStart: string
  deliveryEnd: string
}

type Period = {
  id?: string | number
  whenStart: string
  whenCutoff: string
}

type Prices = {
  flatDiscountApplied: boolean
  amountOff: string
  percentageOff: string | null
  promoCodeValid: boolean
  pricePerPortion: string
  pricePerPortionDiscounted: string
  productTotal: string
  recipeTotal: string
  surchargeTotal: string
  recipeDiscount: string
  deliveryTotal: string
  grossTotal: string
  vatCharged: string
  total: string
  totalDiscount: string
  promoCode: string | null
}

type GiftItem = {
  createdAt: string
  deletedAt: string | null
  id: string
  isGift: string
  isVatable: string
  itemableId: string
  itemableType: string
  listPrice: string
  orderId: string
  productId: string
  quantity: string
  recipeId: string | null
  serialisedItem: any
  title: string
  updatedAt: string
}

type RecipeItem = {
  media: Media[]
  recipeGoustoReference: string
  recipeUuid: string
}

type Media = {
  description: string | null
  title: string | null
  type: string
  urls: Url[]
}

type Url = {
  src: string
  width: string
}

type Attribute = {
  boxType: string
  num_portions: number
  num_recipes: number
  starts_at: string
  ends_at: string
}

type Included = {
  attributes: Attribute
  id: string
  type: string
}

export { Order, Included, RecipeItem }
