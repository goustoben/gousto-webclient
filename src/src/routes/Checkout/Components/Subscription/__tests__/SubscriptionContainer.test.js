import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { SubscriptionContainer } from '../index'

const optionsList = [
  {
    id: '1',
    slug: 'weekly',
    title: 'Weekly',
    description: 'Our most popular option!',
  },
  {
    id: '2',
    slug: 'fortnightly',
    title: 'Fortnightly',
    description: '',
  },
  {
    id: '4',
    slug: 'monthly',
    title: 'Monthly',
    description: '',
  }
]

jest.mock('redux-form', () => ({
  getFormValues: jest.fn(() => () => ({
    delivery: {
      interval_id: '1',
    },
  })),
}))

describe('SubscriptionContainer', () => {
  let wrapper

  const initialState = {
    features: Immutable.Map({
      chooseSubscription: Immutable.Map({
        value: false
      }),
      isCheckoutOverhaulEnabled: Immutable.Map({
        value: false
      })
    }),
    checkout: Immutable.fromJS({
      options: optionsList,
    }),
    request: Immutable.fromJS({
      browser: 'mobile',
    })
  }

  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
    subscribe: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(
      <SubscriptionContainer store={store} />,
    )
  })

  describe('when Subscription is rendered', () => {
    test('then should be rendered properly', () => {
      const expected = {
        features: Immutable.Map({
          chooseSubscription: Immutable.Map({
            value: false
          }),
          isCheckoutOverhaulEnabled: Immutable.Map({
            value: false
          })
        }),
      }
      expect(wrapper.props()).toEqual(expect.objectContaining(expected))
    })
  })
})
