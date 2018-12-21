export const hasJustForYouCollection = ({ menuCollections }) => menuCollections.some(collection => collection.get('slug') === 'recommendations')
