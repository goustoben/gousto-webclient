/* eslint-disable camelcase */
/*
 * This file is a modified copy of the transformation
* function from https://github.com/Gousto/order-api/blob/develop/src/lib/transformers/order-v2-to-v1/request.ts
 */
import moment from 'moment'
import logger from 'utils/logger'
import { ResourceType } from '../constants/resources'
const ChoiceType = {
  Recipe: 'Recipe',
  Product: 'Product',
}

export const filterByType = (array, type) =>
  array.filter((item) => 'type' in item && item.type === type)

export const findByIdAndType = (array, id, type) =>
  array.find((item) => 'id' in item && item.id === id && 'type' in item && item.type === type)

const formatISODateToOrderV1Date = (str) => moment(new Date(str)).format('yyyy-MM-dd HH:mm:ss')

// Sunday 7th March
const formatISODateToHumanReadable = (str) => moment(new Date(str)).format('dddd Do MMMM')

const transformMenuServiceImageToMedia = (image) => ({
  title: image.title,
  description: image.description,
  type: image.type,
  urls: image.crops.map((crop) => ({ src: crop.url, width: String(crop.width) })),
})

const safeTraversal = (objToTraverse, keys, defaultValue = undefined) => keys.reduce((obj, key) => obj && obj[key], { ...objToTraverse }) || defaultValue

const getRecipeItems = (
  recipes,
  included,
) => recipes.map((recipe) => {
  const { id: uuid } = recipe
  const recipeIncludedBlock = findByIdAndType(included, uuid, ResourceType.Recipe)
  const coreId = safeTraversal(recipeIncludedBlock, ['attributes', 'coreRecipeId'])

  if (!recipeIncludedBlock) {
    logger.warning(`missing recipe in included block, recipesId: ${uuid}`)
  }

  return {
    // V2 doesn't supply these this id, so we use UUIDs
    // We use `recipeId` and `recipeUuid` in the app
    id: uuid,
    itemableId: coreId,
    itemableType: ChoiceType.Recipe,
    media: safeTraversal(recipeIncludedBlock, ['attributes', 'images'], []).map(transformMenuServiceImageToMedia),
    quantity: String(safeTraversal(recipe, ['meta', 'portionFor'])),
    recipeGoustoReference: String(safeTraversal(recipeIncludedBlock, ['attributes', 'goustoReference'])),
    recipeId: coreId,
    recipeUuid: uuid,
    title: safeTraversal(recipeIncludedBlock, ['attributes', 'name']),
    updatedAt: formatISODateToOrderV1Date(safeTraversal(recipeIncludedBlock, ['publishedAt'])),
  }
})

const getProductItems = (
  products,
  included,
) => products.map((product) => {
  const productIncludedBlock = findByIdAndType(included, product.id, ResourceType.Product)
  const { id } = product

  if (!productIncludedBlock) {
    logger.warning(`missing recipe in included block, recipesId: ${id}`)
  }

  return {
    // V2 doesn't supply these this id, so we use UUIDs
    // We use `productId` in the app
    id,
    quantity: String(safeTraversal(product, ['meta', 'quantity'])),
    listPrice: safeTraversal(product, ['meta', 'listPrice']),
    itemableType: ChoiceType.Product,
    itemableId: id,
    title: safeTraversal(productIncludedBlock, ['attributes', 'title']),
    productId: id,
    media: safeTraversal(productIncludedBlock, ['attributes', 'media']),
  }
})

/*
* If an order had to have its date changed, such as for a bank holiday
* where we can't deliver. We need this information to inform the user,
* the original date of the Subscriptions/delivery day and we need the reason
* for the messaging we display to the user.
*/
const getOriginalDeliveryDay = (originalDeliveryDay) => {
  if (!originalDeliveryDay) {
    return null
  }

  return {
    humanDate: formatISODateToHumanReadable(originalDeliveryDay.date),
    unavailableReason: originalDeliveryDay.rescheduledReason
  }
}

const getPeriod = (included) => {
  const [period] = filterByType(included, ResourceType.Period)

  /*
  * We use the time stamps below to make request
  * to `deliveries/v1.0/days` with filters
  * * `cutoff_datetime_from` is from `when_start`
  * * `cutoff_datetime_until` is from `when_cutoff`
  * These are transformed in `transformPendingOrders` used by `OrderDelivery` component
  * and provided to `orderGetDeliveryDays`.
  *
  * see: src/routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDelivery.js
  * Example: https://staging-api.gousto.info/deliveries/v1.0/days?filters%5Bcutoff_datetime_from%5D=2021-03-30T12%3A00%3A00%2B01%3A00&filters%5Bcutoff_datetime_until%5D=2021-04-06T11%3A59%3A59%2B01%3A00&ndd=false&delivery_tariff_id=9037a447-e11a-4960-ae69-d89a029569af&sort=date&direction=asc&postcode=n11
  */
  return {
    whenStart: period.attributes.starts_at,
    whenCutoff: period.attributes.ends_at,
  }
}

export const transformOrderV2ToOrderV1 = (
  order,
  included,
) => {
  const { attributes, id: orderId, relationships } = order
  const { prices = {} } = attributes
  const boxId = safeTraversal(relationships, ['box', 'data', 'id'])
  const box = findByIdAndType(included, boxId, ResourceType.Box)
  const deliveryDayId = safeTraversal(relationships, ['deliveryDay', 'data', 'id'])
  const deliveryDay = findByIdAndType(included, deliveryDayId, ResourceType.DeliveryDay)
  const deliveryDayData = safeTraversal(deliveryDay, ['attributes', 'date'])
  const deliveryDate = deliveryDayData && formatISODateToOrderV1Date(deliveryDayData)
  const deliverySlotId = safeTraversal(relationships, ['deliverySlot', 'data', 'id'])
  const deliverySlot = findByIdAndType(included, deliverySlotId, ResourceType.DeliverySlot)
  const shippingAddressId = safeTraversal(relationships, ['shippingAddress', 'data', 'id'])
  const shippingAddress = findByIdAndType(included, shippingAddressId, ResourceType.ShippingAddress)
  const components = relationships.components.data
  const recipes = filterByType(components, ResourceType.Recipe)
  const products = filterByType(components, ResourceType.Product)
  const cutOfDate = formatISODateToOrderV1Date(attributes.cutOffDate)
  const menuActiveFrom = formatISODateToOrderV1Date(attributes.menuActiveFrom)
  const originalDeliveryDay = getOriginalDeliveryDay(attributes.originalDeliveryDay)
  const period = getPeriod(included)

  return {
    id: parseInt(orderId, 10),
    state: attributes.state,
    phase: attributes.phase,
    updatedAt: formatISODateToOrderV1Date(attributes.updatedAt),
    shouldCutoffAt: cutOfDate,
    whenCutoff: cutOfDate,
    default: attributes.isWaitingOnUserChoices,
    deliveryDayId,
    deliveryDate,
    humanDeliveryDate: formatISODateToHumanReadable(deliveryDate),
    deliverySlotId,
    whenLive: menuActiveFrom,
    daySlotLeadTimeId: safeTraversal(relationships, ['daySlotLeadTime', 'data', 'id'], null),
    deliveryTariffId: safeTraversal(relationships, ['deliveryTariff', 'data', 'id'], null),
    deliverySlot: {
      id: deliverySlotId,
      deliveryStart: safeTraversal(deliverySlot, ['attributes', 'start']),
      deliveryEnd: safeTraversal(deliverySlot, ['attributes', 'end']),
    },
    shippingAddress: {
      id: safeTraversal(shippingAddress, ['id']),
      deleted: safeTraversal(shippingAddress, ['attributes', 'deleted']),
      name: safeTraversal(shippingAddress, ['attributes', 'name']),
      companyname: safeTraversal(shippingAddress, ['attributes', 'companyName']),
      line1: safeTraversal(shippingAddress, ['attributes', 'line1']),
      line2: safeTraversal(shippingAddress, ['attributes', 'line2']),
      line3: safeTraversal(shippingAddress, ['attributes', 'line3']),
      town: safeTraversal(shippingAddress, ['attributes', 'town']),
      county: safeTraversal(shippingAddress, ['attributes', 'county']),
      postcode: safeTraversal(shippingAddress, ['attributes', 'postcode']),
      deliveryInstructions: safeTraversal(shippingAddress, ['attributes', 'deliveryInstructions']),
      shippingDefault: safeTraversal(shippingAddress, ['attributes', 'shippingDefault']),
      billingDefault: safeTraversal(shippingAddress, ['attributes', 'billingDefault']),
    },
    box: {
      numPortions: String(safeTraversal(box, ['attributes', 'numPortions'])),
      numRecipes: String(safeTraversal(box, ['attributes', 'numRecipes'])),
      sku: boxId,
    },
    recipeItems: getRecipeItems(recipes, included),
    productItems: getProductItems(products, included),
    giftItems: [],
    prices: {
      flatDiscountApplied: prices.isFlatDiscountApplied,
      amountOff: prices.amountOff,
      percentageOff: prices.percentageOff,
      promoCode: prices.promoCode,
      promoCodeValid: prices.isPromoCodeValid,
      pricePerPortion: prices.perPortion,
      pricePerPortionDiscounted: prices.perPortionDiscounted,
      productTotal: prices.productTotal,
      recipeTotal: prices.recipeTotal,
      surchargeTotal: prices.surchargeTotal,
      recipeDiscount: prices.recipeDiscount,
      deliveryTotal: prices.deliveryTotal,
      grossTotal: prices.grossTotal,
      vatCharged: prices.vatCharged,
      total: prices.total,
      totalDiscount: prices.totalDiscount
    },
    period,
    originalDeliveryDay
  }
}
