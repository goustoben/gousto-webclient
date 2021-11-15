import { set } from "utils/cookieHelper2"
import Cookies from "utils/GoustoCookies"
import { tutorialViewedExpireTime } from "config/cookies"

export const persistTutorialViewed = (getState) => {
    if (__CLIENT__) {
        const viewed = getState().tutorial.get('viewed').toJS()

        set(Cookies, 'tutorial_viewed', viewed, tutorialViewedExpireTime)
    }
}
