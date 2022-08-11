import { StateTypePlaceholder } from '../types'

export const getOrderTotalDataSelector = ({ features }: StateTypePlaceholder) => ({
  isGoustoOnDemandEnabled: features && features.getIn(['isGoustoOnDemandEnabled', 'value'], false),
})
