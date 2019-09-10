import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { MoveRecipeButton } from 'MoveRecipeButton'
import Details from '../../Details/Details'

describe('Details', () => {
  describe('render', () => {
    let wrapper
    const okRecipeIds = Immutable.fromJS({
      '123': 1,
      '456': 1
    })

    const props = {
      orderId: '',
      basketRecipes: Immutable.Map({}),
      numPortions: 2,
      accessToken: 'access-token',
      deliveryDays: Immutable.fromJS({
        '2019-09-05': {
          id: 'dayId',
          date: '2019-09-05',
          coreDayId: '123',
          slots: [{
            id: '12e12'
          }],
          daySlots: []
        }
      }),
      menuBoxPrices: Immutable.fromJS({
        2: {
          2: {
            gourmet: {},
          },
          3: {
            gourmet: {}
          }
        }
      }),
      promoCode: '',
      recipesStore: Immutable.fromJS({
        123: {
          id: '123',
          title: 'First recipe',
          media: {}
        },
        456: {
          id: '456',
          title: 'Second recipe',
          media: {}
        }
      }),
      okRecipeIds: okRecipeIds,
      slotId: '12e12',
      menuFetchPending: false,
      orderSaveError: '',
      pricingPending: false,
      prices: Immutable.Map(),
      unavailableRecipeIds: Immutable.Map(),
      shortlistFeatureEnabled: false,
      basketNumPortionChange: () => { },
      portionSizeSelectedTracking: () => { },
      basketRestorePreviousDate: () => { },
      boxSummaryVisibilityChange: () => { },
      clearSlot: () => { },
      onRemove: () => { },
      view: 'mobile'
    }
    beforeEach(() => {
      wrapper = shallow(<Details {...props} />)
    })
    test('should render mobile view', () => {
      expect(wrapper.find('.supercontainermobile')).toHaveLength(1)
    })

    test('should render desktop view', () => {
      wrapper.setProps({ view: 'desktop' })
      expect(wrapper.find('.supercontainerdesktop')).toHaveLength(1)
    })

    test('should render BoxProgressAlert', () => {
      expect(wrapper.find('BoxProgressAlert')).toHaveLength(1)
    })

    describe('when displayOptions empty', () => {
      test('should render recipeItems', () => {
        expect(wrapper.find('.recipeItems')).toHaveLength(1)
      })
    })

    describe('when pricingPending false', () => {
      test('should render Receipt', () => {
        expect(wrapper.find('Receipt')).toHaveLength(1)
      })
    })
  })
})
