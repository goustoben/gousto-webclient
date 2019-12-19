import { fetchRecipes } from 'apis/recipes'
import { cutoffDateTimeNow } from 'utils/deliveries'
import actionTypes from './actionTypes'

const homeCarouselLoaded = recipes => ({
  type: actionTypes.HOME_CAROUSEL_LOADED,
  recipes: recipes
    .map(({ id, media, title, rating, dietType, availability, boxType, url, shelfLifeDays, cookingTime }) => ({
      id,
      media,
      title,
      rating,
      boxType,
      dietType,
      availability,
      url,
      shelfLifeDays,
      cookingTime,
    })),
})

const homeLoadCarousel = () => (
  async (dispatch) => {
    const cutoffDate = cutoffDateTimeNow()
    const reqArgs = { 'filters[available_on]': cutoffDate }
    const { data: recipes } = await fetchRecipes(null, '', reqArgs)
    dispatch(homeCarouselLoaded(recipes))
  }
)

const homeActions = {
  homeLoadCarousel,
}

export default homeActions
