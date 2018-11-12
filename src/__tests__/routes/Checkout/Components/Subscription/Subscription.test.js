import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'

import Subscription from 'routes/Checkout/Components/Subscription/Subscription' 
import SubscriptionOption from 'routes/Checkout/Components/Subscription/SubscriptionOption'

const createFeatures = (value) => (Immutable.fromJS({
  chooseSubscription: {
    value,
  },
}))

const createOptions = () => (Immutable.fromJS([
  {
    id: '1',
    slug: 'weekly',
    title: 'Weekly',
    description: 'Leave the weekly shop to us',
  },
  {
    id: '2',
    slug: 'fortnightly',
    title: 'Fortnightly',
    description: 'Varied schedule? This box is for you',
  },
  {
    id: '4',
    slug: 'monthly',
    title: 'Monthly',
    description: 'Perfect for the occasional treat',
  },
]))

describe('Subscription', () => {
  let wrapper

  describe('rendering', () => {
    test('should not render by default', () => {
      wrapper = shallow(<Subscription />)

      expect(wrapper.find('.container').length).toBeFalsy()
    })

    test('should not render when options are not set and feature chooseSubscription is true', () => {
      wrapper = shallow(<Subscription
        features={createFeatures(true)}
      />)

      expect(wrapper.find('.container').length).toBeFalsy()
    })

    test('should not render when options are set and feature chooseSubscription is false', () => {
      wrapper = shallow(<Subscription
        features={createFeatures(false)}
        options={createOptions()}
      />)

      expect(wrapper.find('.container').length).toBeFalsy()
    })

    test('should render when options and feature chooseSubscription is true', () => {
      wrapper = shallow(<Subscription
        features={createFeatures(true)}
        options={createOptions()}
      />)

      expect(wrapper.find('.container').length).toBeTruthy()
    })
  })

  describe('SubscriptionOptions', () => {
    test('should be checked if id matches chosenIntervalId', () => {
      const chosenIntervalId = '4'

      wrapper = shallow(<Subscription
        features={createFeatures(true)}
        options={createOptions()}
        chosenIntervalId={chosenIntervalId}
      />)

      const checkedOption = wrapper
        .find(SubscriptionOption)
        .filterWhere(opt => opt.prop('checked'))

      expect(checkedOption.prop('id')).toBe(chosenIntervalId)
    })
  })
})
