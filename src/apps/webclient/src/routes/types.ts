type OrderState =
  | 'confirmed'
  | 'scheduled'
  | 'dispatched'
  | 'menu open'
  | 'recipes chosen'
  | 'delivered'
  | 'cancelled'

export { OrderState }
