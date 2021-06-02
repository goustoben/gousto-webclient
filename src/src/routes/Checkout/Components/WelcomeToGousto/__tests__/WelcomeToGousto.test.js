import React from 'react'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { mount } from 'enzyme'
import { WelcomeToGousto } from '../WelcomeToGousto'

describe('given WelcomeToGousto component', () => {
  let wrapper
  const props = {
    whenCutoff: '25-04-2021',
    deliveryDate: '28-04-2021',
    trackWelcomeToGoustoButton: jest.fn(),
    orderId: 100,
  }

  const state = {
    ribbon: Immutable.fromJS({}),
  }

  const store = {
    getState: jest.fn().mockReturnValue(state),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = mount(<WelcomeToGousto {...props} />, {
      // eslint-disable-next-line react/prop-types
      wrappingComponent: ({ children }) => <Provider store={store}>{children}</Provider>,
    })
  })

  describe('when component is mounted', () => {
    test('then should be rendered correctly', () => {
      expect(wrapper.find('img')).toHaveLength(2)
      expect(wrapper.find('CTA').exists()).toBeTruthy()
      expect(wrapper.find('SubscriptionTransparency').exists()).toBeTruthy()
      expect(wrapper.find('ScheduleTimeline').exists()).toBeTruthy()
      expect(wrapper.find('RibbonTrigger').exists()).toBeTruthy()
      expect(wrapper.find('Loader').exists()).toBeFalsy()
    })
  })

  describe('when date is invalid', () => {
    beforeEach(() => {
      wrapper.setProps({
        deliveryDate: '',
      })
    })

    test('then component should be rendered correctly', () => {
      expect(wrapper.find('ScheduleTimeline').exists()).toBeFalsy()
      expect(wrapper.find('Loader').exists()).toBeTruthy()
    })
  })

  describe('when trackAndgoToMenu is called', () => {
    browserHistory.push = jest.fn()
    beforeEach(() => {
      wrapper.find('CTA').simulate('click')
    })

    test('then trackWelcomeToGoustoButton should be called with proper id', () => {
      expect(props.trackWelcomeToGoustoButton).toHaveBeenCalledWith(props.orderId)
    })

    test('then push should be called with /menu', () => {
      expect(browserHistory.push).toHaveBeenCalledWith('/menu/100')
    })
  })
})
