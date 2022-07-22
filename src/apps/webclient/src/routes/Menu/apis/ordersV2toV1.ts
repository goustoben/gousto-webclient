/* eslint-disable camelcase */

/*
 * This file is a modified copy of the transformation
 * function from https://github.com/Gousto/order-api/blob/develop/src/lib/transformers/order-v2-to-v1/request.ts
 */
import moment from 'moment'

import { ResourceType } from 'routes/Menu/constants/resources'
import logger from 'utils/logger'

import { Included, Order, RecipeItem } from '../domains/orders/v1'

type AnyObject = Record<string, any>
interface Logger {
  warning: (s: string) => void
}

const ChoiceType = {
  Recipe: 'Recipe',
  Product: 'Product',
}
const typedLogger: Logger = logger as Logger

export const filterByType = <T extends { type: string }>(array: T[], type: string) =>
  array.filter((item) => 'type' in item && item.type === type)

export const findByIdAndType = (array: Included[], id: string, type: string) =>
  array.find((item) => 'id' in item && item.id === id && 'type' in item && item.type === type)

const formatISODateToOrderV1Date = (str: string) => moment(str).format('YYYY-MM-DD HH:mm:ss')

// Sunday 7th March
const formatISODateToHumanReadable = (str: string) => moment(str).format('dddd Do MMMM')

const transformMenuServiceImageToMedia = (image: AnyObject) => ({
  title: image.title,
  description: image.description,
  type: image.type,
  urls: image.crops.map((crop: AnyObject) => ({ src: crop.url, width: String(crop.width) })),
})

const safeTraversal = (
  objToTraverse: AnyObject | null | undefined,
  keys: any[],
  defaultValue: any = undefined,
) => keys.reduce((obj, key) => obj && obj[key], { ...(objToTraverse || {}) }) || defaultValue

const getRecipeItems = (recipes: AnyObject[], included: Included[]): RecipeItem[] =>
  recipes.map((recipe) => {
    const { id: uuid } = recipe
    const recipeIncludedBlock = findByIdAndType(included, uuid, ResourceType.Recipe)
    const coreId = safeTraversal(recipeIncludedBlock, ['attributes', 'core_recipe_id'])

    if (!recipeIncludedBlock) {
      typedLogger.warning(`missing recipe in included block, recipesId: ${uuid}`)
    }

    return {
      // V2 doesn't supply these this id, so we use UUIDs
      // We use `recipeId` and `recipeUuid` in the app
      id: uuid,
      itemableId: coreId,
      itemableType: ChoiceType.Recipe,
      media: safeTraversal(recipeIncludedBlock, ['attributes', 'images'], []).map(
        transformMenuServiceImageToMedia,
      ),
      quantity: String(safeTraversal(recipe, ['meta', 'portion_for'])),
      recipeGoustoReference: String(
        safeTraversal(recipeIncludedBlock, ['attributes', 'gousto_reference']),
      ),
      recipeId: coreId,
      recipeUuid: uuid,
      title: safeTraversal(recipeIncludedBlock, ['attributes', 'name']),
      updatedAt: formatISODateToOrderV1Date(safeTraversal(recipeIncludedBlock, ['published_at'])),
    }
  })

const getProductItems = (products: AnyObject[], included: Included[]) =>
  products.map((product) => {
    const productIncludedBlock = findByIdAndType(included, product.id, ResourceType.Product)
    const { id } = product

    if (!productIncludedBlock) {
      typedLogger.warning(`missing recipe in included block, recipesId: ${id}`)
    }

    return {
      // V2 doesn't supply these this id, so we use UUIDs
      // We use `productId` in the app
      id,
      quantity: String(safeTraversal(product, ['meta', 'quantity'])),
      listPrice: safeTraversal(product, ['meta', 'list_price']),
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
const getOriginalDeliveryDay = (originalDeliveryDay: AnyObject): Order['originalDeliveryDay'] => {
  if (!originalDeliveryDay) {
    return null
  }

  return {
    humanDate: formatISODateToHumanReadable(originalDeliveryDay.date),
    unavailableReason: originalDeliveryDay.rescheduledReason,
  }
}

const getPeriod = (included: Included[], id: string) => {
  const period = findByIdAndType(included, id, ResourceType.Period)

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
    whenStart: String(safeTraversal(period, ['attributes', 'starts_at'])),
    whenCutoff: String(safeTraversal(period, ['attributes', 'ends_at'])),
  }
}

export const transformOrderV2ToOrderV1 = (order: AnyObject, included: Included[]): Order | null => {
  if (!order) return null

  const { attributes, id: orderId, relationships } = order
  const { prices = {} } = attributes
  const boxId = safeTraversal(relationships, ['box', 'data', 'id'])
  const box = findByIdAndType(included, boxId, ResourceType.Box)
  const deliveryDayId = safeTraversal(relationships, ['delivery_day', 'data', 'id'])
  const deliveryDay = findByIdAndType(included, deliveryDayId, ResourceType.DeliveryDay)
  const deliveryDayData = safeTraversal(deliveryDay, ['attributes', 'date'])
  const deliveryDate = deliveryDayData && formatISODateToOrderV1Date(deliveryDayData)
  const humanDeliveryDate = deliveryDayData && formatISODateToHumanReadable(deliveryDayData)
  const deliverySlotId = safeTraversal(relationships, ['delivery_slot', 'data', 'id'])
  const deliverySlot = findByIdAndType(included, deliverySlotId, ResourceType.DeliverySlot)
  const shippingAddressId = safeTraversal(relationships, ['shipping_address', 'data', 'id'])
  const shippingAddress = findByIdAndType(included, shippingAddressId, ResourceType.ShippingAddress)
  const components = relationships.components.data
  const recipes = filterByType(components, ResourceType.Recipe)
  const products = filterByType(components, ResourceType.Product)
  const cutOfDate = formatISODateToOrderV1Date(attributes.cut_off_date)
  const menuActiveFrom = formatISODateToOrderV1Date(attributes.menu_active_from)
  const originalDeliveryDay = getOriginalDeliveryDay(attributes.original_delivery_day)
  const period = getPeriod(included, String(order.relationships.period.data.id))

  return {
    id: orderId,
    state: attributes.state,
    phase: attributes.phase,
    updatedAt: formatISODateToOrderV1Date(attributes.updated_at),
    shouldCutoffAt: cutOfDate,
    whenCutoff: cutOfDate,
    default: attributes.is_waiting_on_user_choices,
    deliveryDayId,
    deliveryDate,
    humanDeliveryDate,
    deliverySlotId,
    whenLive: menuActiveFrom,
    daySlotLeadTimeId: safeTraversal(relationships, ['day_slot_lead_time', 'data', 'id'], null),
    deliveryTariffId: safeTraversal(relationships, ['delivery_tariff', 'data', 'id'], null),
    deliverySlot: {
      id: deliverySlotId,
      deliveryStart: safeTraversal(deliverySlot, ['attributes', 'start']),
      deliveryEnd: safeTraversal(deliverySlot, ['attributes', 'end']),
    },
    shippingAddress: {
      id: safeTraversal(shippingAddress, ['id']),
      deleted: safeTraversal(shippingAddress, ['attributes', 'deleted'], false),
      name: safeTraversal(shippingAddress, ['attributes', 'name']),
      companyname: safeTraversal(shippingAddress, ['attributes', 'company_name'], ''),
      line1: safeTraversal(shippingAddress, ['attributes', 'line1']),
      line2: safeTraversal(shippingAddress, ['attributes', 'line2']),
      line3: safeTraversal(shippingAddress, ['attributes', 'line3'], ''),
      town: safeTraversal(shippingAddress, ['attributes', 'town']),
      county: safeTraversal(shippingAddress, ['attributes', 'county']),
      postcode: safeTraversal(shippingAddress, ['attributes', 'postcode']),
      deliveryInstructions: safeTraversal(
        shippingAddress,
        ['attributes', 'delivery_instructions'],
        '',
      ),
      shippingDefault: safeTraversal(shippingAddress, ['attributes', 'shipping_default'], false),
      billingDefault: safeTraversal(shippingAddress, ['attributes', 'billing_default'], false),
    },
    box: {
      numPortions: String(safeTraversal(box, ['attributes', 'num_portions'])),
      numRecipes: String(safeTraversal(box, ['attributes', 'num_recipes'])),
      sku: boxId,
    },
    recipeItems: getRecipeItems(recipes, included),
    productItems: getProductItems(products, included),
    giftItems: [],
    prices: {
      flatDiscountApplied: prices.is_flat_discount_applied,
      amountOff: prices.amount_off,
      percentageOff: prices.percentage_off,
      promoCode: prices.promo_code,
      promoCodeValid: prices.is_promo_code_valid,
      pricePerPortion: prices.per_portion,
      pricePerPortionDiscounted: prices.per_portion_discounted,
      productTotal: prices.product_total,
      recipeTotal: prices.recipe_total,
      surchargeTotal: prices.surcharge_total,
      recipeDiscount: prices.recipe_discount,
      deliveryTotal: prices.delivery_total,
      grossTotal: prices.gross_total,
      vatCharged: prices.vat_charged,
      total: prices.total,
      totalDiscount: prices.total_discount,
      isDeliveryFree: prices.is_delivery_free,
    },
    period,
    originalDeliveryDay,
  }
}
