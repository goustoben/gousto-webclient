import Immutable from 'immutable' /* eslint-disable new-cap */

export default function getPauseScreenContentMapped(contentConfig = Immutable.List([]), contentFromStore = Immutable.Map({}), contextFromStore = Immutable.Map({})) {
  return contentConfig.reduce((workingContent, contentItemConfig) => {
    let finalContentItem = Immutable.Map({
      type: contentItemConfig.get('type'),
    })
    const contentItemDefaults = contentItemConfig.get('defaults', Immutable.Map({}))
    const contentKeysToMap = contentItemConfig.get('mapContent', Immutable.Map({}))

    contentItemDefaults.forEach((defaultValue, key) => {
      if (!contentKeysToMap.get(key)) {
        const finalValue = contextFromStore.get(key, defaultValue)
        finalContentItem = finalContentItem.set(key, finalValue)
      }
    })

    contentKeysToMap.forEach((fromKey, toKey) => {
      const overrideValue = contentFromStore.get(fromKey)
      const defaultValue = contentItemDefaults.get(toKey)
      let finalValue

      if (defaultValue && typeof defaultValue.mergeDeep === 'function') {
        finalValue = defaultValue.mergeDeep(overrideValue)
      } else {
        finalValue = overrideValue || defaultValue
      }

      finalContentItem = finalContentItem.set(toKey, finalValue)
    })

    return workingContent.push(finalContentItem)
  }, Immutable.List([]))
}
