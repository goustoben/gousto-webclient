import Immutable from 'immutable'
import { getBoxSummaryTextProps } from '../boxSummary'

describe('getBoxSummaryTextProps', () => {
  let state, tempOrderId, tempDate, tempSlotId
  const slots = {
    '2019-12-17': [{
      coreSlotId: '2',
      disabled: false,
      label: '8am - 7pm ',
      subLabel: 'Free',
      value: '456asv222'
    }]
  }
  describe('when tempOrderId is empty', () => {
    beforeEach(() => {
      tempOrderId = ''
      tempDate = ''
      tempSlotId = '123abc456'
    })
    describe('when user has address in basket', () => {
      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            address: {
              name: 'Home'
            }
          }),
          user: Immutable.Map(),
          features: Immutable.Map({
            fullScreenBoxSummary: Immutable.Map({
              value: false
            })
          })
        }
      })
      test('should return Address name and button text Contiune', () => {
        const result = getBoxSummaryTextProps(state, tempDate, tempSlotId, tempOrderId, slots)
        const expectedResult = {
          deliveryLocationText: 'Address: Home',
          slotId: '123abc456',
          buttonText: 'Continue',
          showWarning: false
        }
        expect(result).toEqual(expectedResult)
      })

      describe('when user has prevSlotId', () => {
        test('should return Address name and button text Update delivery date', () => {
          const newState = {
            ...state,
            basket: Immutable.fromJS({
              address: {
                name: 'Home'
              },
              prevSlotId: '543aaa333'
            })
          }
          const result = getBoxSummaryTextProps(newState, tempDate, tempSlotId, tempOrderId, slots)
          const expectedResult = {
            deliveryLocationText: 'Address: Home',
            slotId: '123abc456',
            buttonText: 'Update delivery date',
            showWarning: false
          }
          expect(result).toEqual(expectedResult)
        })
      })

      describe('when fullScreenBoxSummary is true', () => {
        test('should return Address name and button text Confirm date', () => {
          const newState = {
            ...state,
            features: Immutable.Map({
              fullScreenBoxSummary: Immutable.Map({
                value: true
              })
            })
          }
          const result = getBoxSummaryTextProps(newState, tempDate, tempSlotId, tempOrderId, slots)
          const expectedResult = {
            deliveryLocationText: 'Address: Home',
            slotId: '123abc456',
            buttonText: 'Confirm date',
            showWarning: false
          }
          expect(result).toEqual(expectedResult)
        })
      })
    })
  })

  describe('when tempOrderId defined', () => {
    beforeEach(() => {
      tempOrderId = '1234'
      tempDate = '2019-12-17'
      tempSlotId = '123abc456'
    })
    describe('when order delivery address has name', () => {
      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            address: {
              name: 'Home'
            }
          }),
          user: Immutable.fromJS({
            orders: {
              '1234': {
                id: '1234',
                shippingAddress: {
                  name: 'Work'
                },
                recipeItems: [],
                deliverySlotId: '2'
              }
            }
          }),
          features: Immutable.Map({
            fullScreenBoxSummary: Immutable.Map({
              value: false
            })
          })
        }
      })
      describe('when no recipes in order', () => {
        test('should return Address name and button text Choose recipes', () => {
          const result = getBoxSummaryTextProps(state, tempDate, tempSlotId, tempOrderId, slots)
          const expectedResult = {
            deliveryLocationText: 'Address: Work',
            slotId: '456asv222',
            buttonText: 'Choose recipes',
            showWarning: false
          }
          expect(result).toEqual(expectedResult)
        })
      })

      describe('when recipes already in order', () => {
        test('should return Address name and button text Choose recipes', () => {
          const newState = {
            ...state,
            user: Immutable.fromJS({
              orders: {
                '1234': {
                  id: '1234',
                  shippingAddress: {
                    name: 'Work'
                  },
                  recipeItems: [{ id: 1 }, { id: 2 }],
                  deliverySlotId: '2'
                }
              }
            })
          }
          const result = getBoxSummaryTextProps(newState, tempDate, tempSlotId, tempOrderId, slots)
          const expectedResult = {
            deliveryLocationText: 'Address: Work',
            slotId: '456asv222',
            buttonText: 'Edit recipes',
            showWarning: false
          }
          expect(result).toEqual(expectedResult)
        })

        describe('when recipes in basket and in order', () => {
          test('should return showWarning true', () => {
            const newState = {
              ...state,
              user: Immutable.fromJS({
                orders: {
                  '1234': {
                    id: '1234',
                    shippingAddress: {
                      name: 'Work'
                    },
                    recipeItems: [{ id: 1 }, { id: 2 }],
                    deliverySlotId: '2'
                  }
                }
              }),
              basket: Immutable.fromJS({
                recipes: {
                  12: 1
                }
              }),
            }
            const result = getBoxSummaryTextProps(newState, tempDate, tempSlotId, tempOrderId, slots)
            const expectedResult = {
              deliveryLocationText: 'Address: Work',
              slotId: '456asv222',
              buttonText: 'Edit recipes',
              showWarning: true
            }
            expect(result).toEqual(expectedResult)
          })
        })
      })
    })
  })
})
