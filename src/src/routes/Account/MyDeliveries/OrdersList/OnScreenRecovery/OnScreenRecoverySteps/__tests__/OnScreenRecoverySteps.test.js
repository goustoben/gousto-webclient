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
  isMultiSkipEnabled: true,
  hasBoxesToSkip: true
}

const shallowWithProps = (props) => {
  shallowWrapper = shallow(<OnScreenRecoverySteps {...defaultProps} {...props} />)
}

describe('OnScreenRecoverySteps', () => {
  describe('Given multiSkip is enabled', () => {
    beforeEach(() => {
      shallowWithProps()
    })

    describe('And there are boxes to skip', () => {
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

    describe('And there are no boxes to skip', () => {
      beforeEach(() => {
        shallowWithProps({ hasBoxesToSkip: false })
      })

      test('Then OnScreenRecoveryView is rendered', () => {
        expect(
          shallowWrapper.find('OnScreenRecoveryViewContainer').exists()
        ).toEqual(true)
      })
    })
  })

  describe('Given multiSkip is NOT enabled', () => {
    describe('And there are boxes to skip', () => {
      beforeEach(() => {
        shallowWithProps({
          isMultiSkipEnabled: false,
          hasBoxesToSkip: true
        })
      })

      test('Then OnScreenRecoveryView is rendered', () => {
        expect(
          shallowWrapper.find('OnScreenRecoveryViewContainer').exists()
        ).toEqual(true)
      })
    })

    describe('And there are no boxes to skip', () => {
      beforeEach(() => {
        shallowWithProps({
          isMultiSkipEnabled: false,
          hasBoxesToSkip: false
        })
      })

      test('Then OnScreenRecoveryView is rendered', () => {
        expect(
          shallowWrapper.find('OnScreenRecoveryViewContainer').exists()
        ).toEqual(true)
      })
    })
  })
})
