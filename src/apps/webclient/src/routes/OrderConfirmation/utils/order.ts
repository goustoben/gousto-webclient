import Immutable from 'immutable'

export const getOrderWhenStartDate = (order = Immutable.Map({})) =>
  order.getIn(['period', 'whenStart']) as string | undefined
