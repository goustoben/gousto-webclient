import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { WelcomeExperimentSwitch } from '../WelcomeExperimentSwitch'
import WelcomeOriginal from '../Welcome'
import { Welcome as WelcomeExperiment } from '../Welcome.experiment'

describe('WelcomeExperimentSwitch', () => {
  let wrapper
  const defaultProps = {
    params: {
      orderId: '1234'
    },
    isWelcomePageOnboardingEnabled: false,
    query: {
      var: 'var'
    },
    orderId: '1234',
    productDetailId: '123',
    productDetailVisibilityChange: jest.fn(),
    products: Immutable.Map(),
    user: Immutable.Map(),
    userFetchReferralOffer: jest.fn(),
    device: 'mobile',
    trackWelcomeAppPromoClick: jest.fn(),
    updateUserTasteProfile: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<WelcomeExperimentSwitch {...defaultProps} />)
  })

  describe('when isWelcomePageOnboardingEnabled is false', () => {
    test('should render WelcomeOriginal', () => {
      expect(wrapper.find(WelcomeOriginal).length).toEqual(1)
    })
  })

  describe('updateUserTasteProfile', () => {
    test('should call updateUserTasteProfile', () => {
      expect(defaultProps.updateUserTasteProfile).toHaveBeenCalled()
    })
  })

  describe('when isWelcomePageOnboardingEnabled is true', () => {
    beforeEach(() => {
      const updatedProps = {
        ...defaultProps,
        isWelcomePageOnboardingEnabled: true
      }
      wrapper = shallow(<WelcomeExperimentSwitch {...updatedProps} />)
    })

    test('should render WelcomeExperiment', () => {
      expect(wrapper.find(WelcomeExperiment).length).toEqual(1)
    })
  })
})
