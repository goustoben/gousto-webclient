import Immutable from 'immutable'

type KeyOf<T> = keyof T
type ValueOf<T> = T[KeyOf<T>]
type ImmutableMapHack<T> = {
  get: (key: KeyOf<T>) => ValueOf<T>
  set: (key: KeyOf<T>, value: ValueOf<T>) => void
}

type DaySlot = {
  activeForNonSubscribersOneOff: boolean
  activeForSignups: boolean
  activeForSubscribersOneOff: boolean
  alternateDay: string | null
  dayId: string
  id: string
  slotId: string
  unavailableReason: string
  whenCutoff: string
}

type Slot = {
  coreSlotId: string
  cutoffDay: number
  cutoffTime: string
  defaultDay: number
  deliveryEndTime: string
  deliveryPrice: string
  deliveryStartTime: string
  id: string
  isDefault: boolean
  whenCutoff: string
}

type BoxSummaryDeliveryDay = {
  alternateDeliveryDay: string | null
  coreDayId: string
  date: string
  id: string
  isDefault: boolean
  unavailableReason: string
  daySlots: DaySlot[]
  slots: Slot[]
}

type UnknownBasketPropTypes = {
  surcharges: any[]
  stepsOrder: any[]
  products: any
  gifts: any
  previewOrder: any
}
type Basket = UnknownBasketPropTypes & {
  address: string | null
  addressTypeEdited: boolean
  boxId: string
  chosenAddress: string
  collection: string
  currentMenuId: string
  date: string
  hasAddedFirstRecipe: boolean
  limitReached: boolean
  numAdults: number
  numPortions: number
  orderId: string
  postcode: string
  prevAddress: string | null
  prevDate: string
  prevPostcode: string
  prevSlotId: string
  previewOrderId: string
  promoCode: string
  promoCodeApplied: true
  promoCodeUrl: string
  recipes: Immutable.Map<number, number>
  slotId: string
  subscriptionOption: string
  tariffId: string | null
  unsaved: boolean
}

export type StateTypePlaceholder = {
  basket: Basket & ImmutableMapHack<Basket>
  recipes: Immutable.Map<string, any>
  menuRecipesStore: Immutable.Map<string, any>
  menuRecipeStock: Immutable.Map<string, any>
  menuBoxPrices: Immutable.Map<string, any>
  boxSummaryDeliveryDays: Immutable.Map<string, BoxSummaryDeliveryDay>
  deliveryDate: Immutable.Map<string, any>
  slotId: Immutable.Map<string, any>
  features: Immutable.Map<string, any>
}
