import { useSelector, useDispatch } from 'react-redux'
import {
  getBasketSlotId, getBasketDate,
  getChosenAddressId, getBasketPostcode
} from 'selectors/basket'
import {
  basketSlotChange, basketDateChange,
  basketChosenAddressChange, basketPostcodeChange
} from 'actions/basket'

const useSlotId = () => useSelector(getBasketSlotId)
const useDeliveryDate = () => useSelector(getBasketDate)
const useDeliveryAddressId = () => useSelector(getChosenAddressId)
const usePostcode = () => useSelector(getBasketPostcode)

const useModifyDelivery = () => {
  const dispatch = useDispatch()

  const changeSlotById = (slotId: string) => dispatch(basketSlotChange(slotId))
  const changeDeliveryDate = (date: string) => dispatch(basketDateChange(date))
  const changeDeliveryAddress = (address: any) => dispatch(basketChosenAddressChange(address))
  const changePostcode = (postcode: string) => dispatch(basketPostcodeChange(postcode))

  return {
    changeSlotById,
    changeDeliveryDate,
    changeDeliveryAddress,
    changePostcode,
  }
}

export const useBasketDelivery = () => {
  const slotId = useSlotId()
  const deliveryDate = useDeliveryDate()
  const deliveryAddressId = useDeliveryAddressId()
  const postcode = usePostcode()

  return {
    ...useModifyDelivery(),

    slotId,
    deliveryDate,
    deliveryAddressId,
    postcode,
  }
}
