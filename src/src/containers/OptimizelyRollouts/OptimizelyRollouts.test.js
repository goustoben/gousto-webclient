import React from 'react'
import { shallow } from 'enzyme'
import { safeJestMock } from '_testing/mocks'
import * as optimizelySDK from './optimizelySDK'
import { OptimizelyRollouts } from './OptimizelyRollouts'

const mockedGetOptimizelyInstance = safeJestMock(optimizelySDK, 'getOptimizelyInstance')
const mockedHasValidInstance = safeJestMock(optimizelySDK, 'hasValidInstance')

describe('OptimizelyRollouts', () => {
  let wrapper
  let mockedLoadOptimizelySDK

  beforeEach(() => {
    mockedGetOptimizelyInstance.mockResolvedValue({
      isFeatureEnabled: () => false,
    })
    mockedHasValidInstance.mockResolvedValue(true)
    mockedLoadOptimizelySDK = jest.fn()

    wrapper = shallow(
      <OptimizelyRollouts featureName="mock-feature" trackExperimentInSnowplow={() => {}} isLoading={false} loadOptimizelySDK={mockedLoadOptimizelySDK}>
        <div>mock-child</div>
      </OptimizelyRollouts>
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When component mounts', () => {
    test('calls loadOptimizelySDK', () => {
      expect(mockedLoadOptimizelySDK).toHaveBeenCalled()
    })
  })

  describe('When "isLoading" is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <OptimizelyRollouts
          featureName="mock-feature"
          trackExperimentInSnowplow={() => {}}
          isLoading
          featureEnabled
          loadOptimizelySDK={mockedLoadOptimizelySDK}
        >
          <div>mock-child</div>
        </OptimizelyRollouts>
      )
    })

    test('renders null', () => {
      expect(wrapper.getElement()).toEqual(null)
    })
  })

  describe('When no "authUserId" is given', () => {
    describe('And no "sessionId" is given', () => {
      describe('And "featureEnabled" is false', () => {
        test('renders children', () => {
          expect(wrapper.getElement()).toEqual(<div>mock-child</div>)
        })
      })
    })
  })

  describe('When "authUserId" is given', () => {
    describe('And "featureEnabled" is true', () => {
      beforeEach(() => {
        wrapper.setProps({
          featureEnabled: true,
          authUserId: 'mock-user-id'
        })
      })

      describe('And no optimizely instance is provided', () => {
        test('renders null', () => {
          expect(wrapper.getElement()).toBe(null)
        })
      })

      describe('And optimizely feature is not enabled', () => {
        test('renders null', () => {
          expect(wrapper.getElement()).toBe(null)
        })
      })

      describe('And optimizely feature is enabled', () => {
        const mockedTrackExperimentInSnowplow = jest.fn()
        beforeEach(async () => {
          mockedGetOptimizelyInstance.mockResolvedValue({
            isFeatureEnabled: () => true,
          })

          wrapper = await shallow(
            <OptimizelyRollouts
              featureName="mock-feature"
              featureEnabled
              authUserId="mock-auth-id"
              trackExperimentInSnowplow={mockedTrackExperimentInSnowplow}
              isLoading={false}
              loadOptimizelySDK={mockedLoadOptimizelySDK}
            >
              <div>mock-child</div>
            </OptimizelyRollouts>
          )
        })

        test('renders children', () => {
          expect(wrapper.getElement()).toEqual(<div>mock-child</div>)
        })

        test('tracks experiment in snowplow', () => {
          expect(mockedTrackExperimentInSnowplow).toHaveBeenCalledWith(
            'mock-feature',
            true,
            'mock-auth-id',
            null
          )
        })
      })
    })
  })

  describe('When "sessionId" is given', () => {
    describe('And "featureEnabled" is true', () => {
      beforeEach(() => {
        wrapper.setProps({
          featureEnabled: true,
          sessionId: 'mock-session-id'
        })
      })

      describe('And no optimizely instance is provided', () => {
        test('renders null', () => {
          expect(wrapper.getElement()).toBe(null)
        })
      })

      describe('And optimizely feature is not enabled', () => {
        test('renders null', () => {
          expect(wrapper.getElement()).toBe(null)
        })
      })

      describe('And optimizely feature is enabled', () => {
        const mockedTrackExperimentInSnowplow = jest.fn()
        beforeEach(async () => {
          mockedGetOptimizelyInstance.mockResolvedValue({
            isFeatureEnabled: () => true
          })

          wrapper = await shallow(
            <OptimizelyRollouts
              isLoading={false}
              featureName="mock-feature"
              featureEnabled
              sessionId="mock-session-id"
              trackExperimentInSnowplow={mockedTrackExperimentInSnowplow}
              loadOptimizelySDK={mockedLoadOptimizelySDK}
            >
              <div>mock-child</div>
            </OptimizelyRollouts>
          )
        })

        test('renders children', () => {
          expect(wrapper.getElement()).toEqual(<div>mock-child</div>)
        })

        test('tracks experiment in snowplow', () => {
          expect(mockedTrackExperimentInSnowplow).toHaveBeenCalledWith(
            'mock-feature',
            true,
            null,
            'mock-session-id'
          )
        })
      })
    })
  })
})
