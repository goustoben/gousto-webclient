import { nourishedCollections, mockNourishedData } from './mockNourishedData'

const nourishedData = {
  '60006307-d5f4-4364-9d44-2be34c6bc536': {
    name: 'Ginseng',
    src: 'https://cdn.shopify.com/s/files/1/0232/9618/0301/products/Ginseng_Square_900x.jpg?v=1603189291.jpg',
    url: 'https://cdn.shopify.com/s/files/1/0232/9618/0301/products/Ginseng_Square_900x.jpg?v=1603189291.jpg',
  },
}

const strToInt = (string) => {
  const bytes = []
  for (let i = 0; i < string.length; ++i) {
    bytes.push(string.charCodeAt(i))
  }

  return bytes.reduce((acc, cur) => acc + cur)
}

const uuidToListItem = (uuid, list) => list[strToInt(uuid) % list.length]

const mockRecipeItems = (order) =>
  order.recipeItems.map((item) => {
    const mockData = nourishedData[item.recipeUuid]
    if (mockData) {
      item.media.forEach((m) => {
        m.urls.forEach((url) => (url.src = mockData.url))
      })
    }

    return item
  })

const mockOrders = (orders) =>
  orders.map((order) => ({ ...order, recipeItems: mockRecipeItems(order) }))

const mockMenuResponse = (response) => {
  const [primary_menu, secondary_menu] = response.data
  const selectedCollections = {}

  response.included.forEach((collection) => {
    if (collection.type === 'collection') {
      const theName = nourishedCollections[collection.attributes.short_title]
      collection.attributes.short_title = theName
      selectedCollections[collection.id] = theName
    }
  })

  const collectionData = []
  primary_menu.relationships.collections.data.forEach((collection) => {
    if (collection.type === 'collection') {
      const collectionName = selectedCollections[collection.id]
      if (collectionName) {
        const nourishments = mockNourishedData[collectionName.toLowerCase()]
        collection.relationships.recipes.data.forEach((recipe) => {
          if (recipe.type === 'recipe') {
            const theAttrs = response.included.find((item) => item.id === recipe.id)
            const nourishment = uuidToListItem(recipe.id, nourishments)
            theAttrs.attributes.name = nourishment.name
            theAttrs.attributes.images.forEach((image) => {
              image.crops.forEach((crop) => (crop.url = nourishment.url))
            })
          }
        })
        collectionData.push(collection)
      }
    } else {
      collectionData.push(collection)
    }
  })
  primary_menu.relationships.collections.data = collectionData

  return response
}

export { mockMenuResponse }
