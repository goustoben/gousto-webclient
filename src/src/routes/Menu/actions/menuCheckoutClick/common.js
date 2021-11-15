import { isOptimizelyFeatureEnabledFactory } from "containers/OptimizelyRollouts"

export const isOrderApiCreateEnabled = isOptimizelyFeatureEnabledFactory('radishes_order_api_create_web_enabled')
export const isOrderApiUpdateEnabled = isOptimizelyFeatureEnabledFactory('radishes_order_api_update_web_enabled')
