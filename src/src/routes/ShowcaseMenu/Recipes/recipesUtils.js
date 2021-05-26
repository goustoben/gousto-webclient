export const convertRemCssValueToPixels = (remString) => {
  if (__CLIENT__) {
    const rem = Number.parseInt(remString, 10)

    return rem * parseFloat(window.getComputedStyle(document.documentElement).fontSize)
  } else {
    return 0
  }
}

export const getScrollStepInPixels = (css) =>
  convertRemCssValueToPixels(css.cardWidth) + convertRemCssValueToPixels(css.spaceBetweenCards)

// Note: ui-components/RecipeCard doesn't allow empty media, but if the
// response doesn't have media for a given recipe, we still want to render the
// card.  So a missing-media structure has a form that allows RecipeCard to
// render without crashing.
const DEFAULT_MEDIA = [
  {
    url: '',
    width: 0,
  },
]

export const getMediaForRecipeCard = (recipe) => {
  const images = recipe.getIn(['media', 'images'])
  if (!(images && images.size > 0)) {
    return DEFAULT_MEDIA
  }
  const image = images.find((anImage) => anImage.get('type') === 'mood-image')
  if (!image) {
    return DEFAULT_MEDIA
  }
  const urls = image.get('urls')
  if (!(urls && urls.size > 0)) {
    return DEFAULT_MEDIA
  }
  const result = urls.map((item) => ({ url: item.get('src'), width: item.get('width') })).toJS()

  return result
}
