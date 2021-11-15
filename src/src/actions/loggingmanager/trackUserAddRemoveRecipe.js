import { getDefaultParams } from "actions/loggingmanager/getDefaultParams"
import { EVENT_NAMES } from "actions/loggingmanager/EVENT_NAMES"
import { generateLoggingManagerRequest } from "actions/loggingmanager/generateLoggingManagerRequest"
import { triggerLoggingManagerEvent } from "apis/loggingmanager/triggerLoggingManagerEvent"

const trackUserAddRemoveRecipe = () => (
    async (dispatch, getState) => {
        const state = getState()
        const {basket, boxSummaryDeliveryDays} = state
        const {authUserId, device, accessToken} = getDefaultParams(state)

        if (authUserId && basket.get('date') && boxSummaryDeliveryDays.get(basket.get('date'))) {
            const recipes = basket.get('recipes')
                .keySeq()
                .toArray()
                .reduce((acc, recipe, index) => ({
                    ...acc,
                    [`recipe${index + 1}`]: recipe,
                }), {})

            const foundDaySlot = boxSummaryDeliveryDays
                .get(basket.get('date'))
                .get('daySlots')
                .find(daySlot => daySlot.get('slotId') === basket.get('slotId', ''))

            if (foundDaySlot) {
                const loggingManagerEvent = {
                    eventName: EVENT_NAMES.basketUpdated,
                    authUserId,
                    data: {
                        device,
                        ...recipes,
                        dayId: foundDaySlot.get('dayId'),
                        slotId: basket.get('slotId'),
                        addressId: basket.getIn(['chosenAddress', 'id']),
                        numPortions: basket.get('recipes').reduce((acc, numOfPortions) => (
                            acc + numOfPortions
                        ), 0),
                    },
                }

                const loggingManagerRequest = generateLoggingManagerRequest({loggingManagerEvent})

                triggerLoggingManagerEvent({accessToken, loggingManagerRequest})
            }
        }
    }
)
export { trackUserAddRemoveRecipe }
