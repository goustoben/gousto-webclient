import { Map, List } from 'immutable'

type Nullable<T> = T | null

type Recipes = {
  [key: string]: number
}

type Period = {
  whenStart: string
  whenCutoff: string
}

type Address = {
  userId: string
  billingDefault: boolean
  companyname: string
  county: Nullable<string | undefined>
  name: string
  premiumDelivery: boolean
  postcode: string
  state: string
  town: string
  shippingDefault: boolean
  deleted: boolean
  deliveryInstructions: string
  id: string
  line1: string
  line2: string
  line3: string
}

type ShippingAddress = Omit<Address, 'userId' | 'premiumDelivery' | 'state'>

type Prices = {
  surchargeTotal: string
  promoCodeValid: boolean
  grossTotal: string
  flatDiscountApplied: boolean
  total: string
  totalDiscount: string
  vatCharged: string
  recipeDiscount: string
  deliveryTotal: string
  pricePerPortionDiscounted: string
  pricePerPortion: string
  percentageOff: string
  productTotal: string
  recipeTotal: string
  amountOff: string
  promoCode: string | undefined
}

type Box = {
  numPortions: string
  numRecipes: string
  sku: string
}

type DeliverySlot = {
  id: string
  deliveryStart: string
  deliveryEnd: string
}

type Url = {
  src: string
  width: string
}

type Media = {
  title: Nullable<string>
  description: Nullable<string>
  type: string
  urls: Url[]
}

type RecipeItem = {
  media: Media[]
  itemableType: string
  itemableId: string
  recipeUuid: string
  recipeId: string
  quantity: string
  updatedAt: string
  id: string
  title: string
  recipeGoustoReference: string
}

type Surcharge = {
  name: string
  price: number
  core_surcharge_id: number
}

type Surcharges = {
  for2: Nullable<Surcharge>
  for4: Nullable<Surcharge>
}

type RecipeChoice = {
  id: string
  quantity: number
  type: string
}

type PreviewOrder = {
  delivery_day_id: string
  delivery_slot_id: string
  recipe_choices: RecipeChoice[]
  day_slot_lead_time_id: string
  delivery_tariff_id: string
  address_id: string
  promo_code: string
}

type OrderDetails = {
  period: Period
  default: boolean
  deliveryDate: string
  deliveryDayId: string
  shippingAddress: ShippingAddress
  whenLive: string
  whenCutoff: string
  prices: Prices
  box: Box
  deliverySlotId: string
  updatedAt: string
  humanDeliveryDate: string
  giftItems: Map<string, number>
  productItems: Map<string, number>
  state: string
  deliverySlot: DeliverySlot
  recipeItems: RecipeItem[]
  deliveryTariffId: Nullable<string>
  shouldCutoffAt: string
  originalDeliveryDay: Nullable<string>
  id: string
  phase: string
  daySlotLeadTimeId: string
}

export type Basket = Map<
  string,
  {
    prevPostcode: string
    previewOrderId: string
    prevDate: string
    promoCodeApplied: boolean
    prevAddress: Nullable<string>
    editBox: boolean
    chosenAddress: Nullable<string>
    products: Map<string, number>
    gifts: Map<string, number>
    recipes: Recipes
    boxId: Nullable<string>
    previewOrder: PreviewOrder
    stepsOrder: string[]
    orderId: string
    prevSlotId: string
    postcode: string
    unsaved: boolean
    date: string
    surcharges: List<Surcharges>
    numPortions: number
    subscriptionOption: string
    promoCodeUrl: string
    currentMenuId: string
    orderDetails: OrderDetails
    address: Address
    limitReached: boolean
    addressTypeEdited: boolean
    hasAddedFirstRecipe: boolean
    slotId: string
    promoCode: string
    collection: string
    numAdults: number
    tariffId: Nullable<string>
  }
>
