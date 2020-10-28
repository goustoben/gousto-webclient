import React from 'react'
import { shallow } from 'enzyme'

import { act } from 'react-dom/test-utils'

import { OnScreenRecoverySteps } from '../OnScreenRecoverySteps'

let shallowWrapper

jest.mock('../../../../../MultiSkipScreen/MultiSkipScreenContainer.js', () => ({
  // eslint-disable-next-line
  MultiSkipScreenContainer: ({ handleContinueToPause }) => (
    <button type="button" onClick={handleContinueToPause} />
  )
}))

jest.mock('../../OnScreenRecoveryView', () => ({
  OnScreenRecoveryViewContainer: () => <div />
}))

const defaultProps = {
  isMultiSkipEnabled: true
}

const shallowWithProps = (props) => {
  shallowWrapper = shallow(<OnScreenRecoverySteps {...defaultProps} {...props} />)
}

describe('OnScreenRecoverySteps', () => {
  describe('Given multiSkip is enabled', () => {
    beforeEach(() => {
      shallowWithProps()
    })

    test('Then MultiSkipScreen is rendered', () => {
      expect(
        shallowWrapper.find('MultiSkipScreenContainer').exists()
      ).toEqual(true)
    })

    describe('When I click continue to pause', () => {
      beforeEach(() => {
        act(() => {
          shallowWrapper
            .find('MultiSkipScreenContainer')
            .dive()
            .find('button')
            .simulate('click')
        })
      })

      test('Then OnScreenRecoveryView is rendered', () => {
        expect(
          shallowWrapper.find('OnScreenRecoveryViewContainer').exists()
        ).toEqual(true)
      })
    })
  })

  describe('Given multiSkip is NOT enabled', () => {
    beforeEach(() => {
      shallowWithProps({ isMultiSkipEnabled: false })
    })

    test('Then OnScreenRecoveryView is rendered', () => {
      expect(
        shallowWrapper.find('OnScreenRecoveryViewContainer').exists()
      ).toEqual(true)
    })
  })
})
