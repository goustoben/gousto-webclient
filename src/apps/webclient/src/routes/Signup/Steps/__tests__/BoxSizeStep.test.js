import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { BoxSizeStep } from '../BoxSize/BoxSizeStep'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
}))

const store = configureStore()
const mockedStore = store({
  auth: Immutable.fromJS({}),
  basket: Immutable.fromJS({}),
  menu: Immutable.fromJS({
    menuLimits: [],
  }),
  menuRecipeDetails: Immutable.fromJS({}),
  tracking: Immutable.fromJS({}),
  menuCollections: Immutable.fromJS({}),
})

describe('given the user is at the Box Size Step', () => {
  let wrapper
  let boxSizeWrapper
  const numPortionChange = jest.fn()
  const numPortionChangeTracking = jest.fn()
  const trackSignupWizardAction = jest.fn()
  const next = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={mockedStore}>
        <BoxSizeStep
          numPortionChange={numPortionChange}
          numPortionChangeTracking={numPortionChangeTracking}
          next={next}
          trackSignupWizardAction={trackSignupWizardAction}
        />
      </Provider>,
    )
    boxSizeWrapper = wrapper.find('BoxSizeStep')
    console.log(boxSizeWrapper.debug({ verbose: true }))
  })

  test('then the component renders correctly', () => {
    expect(boxSizeWrapper.find('Heading').exists()).toBeTruthy()
    expect(boxSizeWrapper.find('.subtitle').exists()).toBeTruthy()
    expect(boxSizeWrapper.find('.boxSizeInner').exists()).toBeTruthy()
    expect(boxSizeWrapper.find('.carouselItem')).toHaveLength(2)
    expect(boxSizeWrapper.find('PrimaryButton')).toHaveLength(2)
  })

  describe('when the user chooses the box size', () => {
    beforeEach(() => {
      boxSizeWrapper.find('PrimaryButton').at(0).prop('onPrimaryButtonClick')(2)
    })

    test('then proper amount of portions are set correctly', () => {
      expect(numPortionChange).toHaveBeenCalledWith(2)
      expect(numPortionChangeTracking).toHaveBeenCalledWith(2)
      expect(trackSignupWizardAction).toHaveBeenCalledWith('complete_wizard_box_size', {
        box_size: 2,
      })
      expect(next).toHaveBeenCalledWith()
    })
  })
})
