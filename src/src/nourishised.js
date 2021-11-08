import { nourishedCollections, mockNourishedData, mockMarketPlaceItems } from './mockNourishedData'

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

const mockOrders = (orders) => {
  const nourishments = mockNourishedData['all nourishments']

  orders.forEach((order) => {
    order.recipeItems.forEach((item) => {
      const nourishment = uuidToListItem(item.recipeUuid, nourishments)
      item.title = nourishment.name
      item.media.forEach((m) => {
        m.urls.forEach((url) => (url.src = nourishment.src))
      })
    })
  })

  return orders
}

const transformCollectionAndReturn = (response) => {
  const selectedCollections = {}
  response.included.forEach((collection) => {
    if (collection.type === 'collection') {
      const theName = nourishedCollections[collection.attributes.short_title]
      collection.attributes.short_title = theName
      selectedCollections[collection.id] = theName
    }
  })

  return selectedCollections
}

const replaceRecipeAttribute = (response, collection, nourishments) => {
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
}

const mockCollections = (menu, selectedCollections, response) => {
  const collectionData = []
  menu.relationships.collections.data.forEach((collection) => {
    if (collection.type !== 'collection') collectionData.push(collection)
    if (collection.type === 'collection' && selectedCollections[collection.id]) {
      const collectionName = selectedCollections[collection.id]
      const nourishments = mockNourishedData[collectionName.toLowerCase()]
      replaceRecipeAttribute(response, collection, nourishments)
      collectionData.push(collection)
    }
  })
  menu.relationships.collections.data = collectionData
}

const mockMenuResponse = (response) => {
  const [primary_menu, secondary_menu] = response.data
  const selectedCollections = transformCollectionAndReturn(response)
  mockCollections(primary_menu, selectedCollections, response)
  mockCollections(secondary_menu, selectedCollections, response)

  return response
}

const mockRecipes = (recipes) => {
  const nourishments = mockNourishedData['all nourishments']
  recipes.forEach((recipe) => {
    const nourishment = uuidToListItem(recipe.id, nourishments)
    recipe.attributes.name = nourishment.name
    recipe.attributes.images.forEach((image) => {
      image.crops.forEach((crop) => (crop.url = nourishment.url))
    })
  })
}

const mockProducts = (products) => {
  products.forEach((product) => {
    const marketPlaceItem = uuidToListItem(product.id, mockMarketPlaceItems)
    product.title = marketPlaceItem.name
    for (const [_size, obj] of Object.entries(product.images)) {
      obj.src = marketPlaceItem.src
      obj.url = marketPlaceItem.url
    }
    console.log(product)
  })

  return products
}

export { mockMenuResponse, mockOrders, mockRecipes, mockProducts }
