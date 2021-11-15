import { actionTypes } from "actions/actionTypes"

export const basketNumPeopleChange = peopleObj => (
  (dispatch, getState) => {
    const numAdultsValid = peopleObj && typeof peopleObj.numAdults !== 'undefined' ? peopleObj.numAdults : getState().basket.get('numAdults', 0)
    const people = {numAdults: numAdultsValid}
    dispatch({
      type: actionTypes.BASKET_NUM_PEOPLE_CHANGE,
      people,
      trackingData: {
        actionType: actionTypes.BASKET_NUM_PEOPLE_CHANGE,
        people,
      },
    })
  }
)
