type AgeVerified = '0' | '1'
type MarketingOptions = '0' | '1'
type Vip = '0' | '1'

type Address = {
  id: string,
  deleted: boolean,
  user_id: string,
  name: string,
  companyname: string,
  line1: string,
  line2: string,
  line3: string,
  town: string,
  county: string | null,
  postcode: string,
  delivery_instructions: string,
  shipping_default: boolean,
  billing_default: boolean,
  state: 'valid' | 'invalid',
  premium_delivery: boolean
}

type DeliverySlot = {
  default_day: string,
  number: string,
}

type Subscription = {
  user_id: string,
  created_at: string,
  box: unknown,
  state: 'active' | 'inactive' | 'suspended',
  state_reason: unknown,
  interval: '1' | '2' | '3', // weekly, forthnightly and monthly
  deliveryslot: DeliverySlot,
}

export type User = {
  id: string,
  email: string,
  gender: string,
  salutation: string,
  name_first: string,
  name_last: string,
  phone: string,
  phone_country_code: string,
  phone_alternate: string | null,
  when_birth: string | null,
  deleted: boolean,
  gousto_reference: string,
  marketing_do_allow_email: MarketingOptions,
  marketing_do_allow_sms: MarketingOptions,
  marketing_do_allow_post: MarketingOptions,
  marketing_do_allow_phone: MarketingOptions,
  marketing_do_allow_thirdparty: MarketingOptions,
  tariff: string,
  age_verified: AgeVerified,
  vip: Vip,
  status: string,
  referral_link: string,
  delivery_tariff_id: string,
  shipping_address_id: string,
  billing_address_id: string,
  'referral-code': string,
  shipping_address: Address,
  billing_address: Address,
  subscription: Subscription,
}
