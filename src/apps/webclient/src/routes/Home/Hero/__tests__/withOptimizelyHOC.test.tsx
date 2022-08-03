import React, { Component } from 'react'

import { safeJestMock } from '_testing/mocks'
import { shallow } from 'enzyme'

import * as OptimizelyHooks from 'containers/OptimizelyRollouts/useOptimizely.hook'

import * as withOptimizelyHOCModule from '../withOptimizelyHOC'

const mockUseIsOptimizelyFeatureEnabled = safeJestMock(
  OptimizelyHooks,
  'useIsOptimizelyFeatureEnabled',
)
const mockWithOptimizelyHOC = jest.spyOn(withOptimizelyHOCModule, 'withOptimizelyHOC')

type Props = { text: string }
const mockFeatureFlag = 'test_feature_flag'
const mockClassComponentProps = { text: 'test_text' }

/* eslint-disable react/prefer-stateless-function */
class mockClassComponent extends Component<Props> {
  render() {
    const { text } = this.props as Props

    return <div>{text}</div>
  }
}

const mockFunctionalComponent = jest.fn(() => null)

describe('Given withOptimizelyHOC', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('When Class component is wrapped in HOC', () => {
    describe('When Optimizely is loading', () => {
      it('Then isOptimizelyFeatureEnabled should be null', async () => {
        const useIsOptimizelyFeatureEnabledValue = null
        mockUseIsOptimizelyFeatureEnabled.mockReturnValue(useIsOptimizelyFeatureEnabledValue)

        const WithOptimizelyWrappedComponent = withOptimizelyHOCModule.withOptimizelyHOC(
          mockClassComponent,
          mockFeatureFlag,
        )
        const wrapper = shallow(<WithOptimizelyWrappedComponent {...mockClassComponentProps} />)

        const isOptimizelyFeatureEnabled = await wrapper.props().isOptimizelyFeatureEnabled

        expect(isOptimizelyFeatureEnabled).toEqual(useIsOptimizelyFeatureEnabledValue)
        expect(mockWithOptimizelyHOC).toHaveBeenCalledTimes(1)
        expect(mockWithOptimizelyHOC).toHaveBeenCalledWith(mockClassComponent, mockFeatureFlag)
      })
    })

    describe('When Optimizely returns true', () => {
      it('Then isOptimizelyFeatureEnabled should be true', async () => {
        const useIsOptimizelyFeatureEnabledValue = true
        mockUseIsOptimizelyFeatureEnabled.mockReturnValue(useIsOptimizelyFeatureEnabledValue)

        const WithOptimizelyWrappedComponent = withOptimizelyHOCModule.withOptimizelyHOC(
          mockClassComponent,
          mockFeatureFlag,
        )
        const wrapper = shallow(<WithOptimizelyWrappedComponent {...mockClassComponentProps} />)

        const isOptimizelyFeatureEnabled = await wrapper.props().isOptimizelyFeatureEnabled

        expect(isOptimizelyFeatureEnabled).toEqual(useIsOptimizelyFeatureEnabledValue)
        expect(mockWithOptimizelyHOC).toHaveBeenCalledTimes(1)
        expect(mockWithOptimizelyHOC).toHaveBeenCalledWith(mockClassComponent, mockFeatureFlag)
      })
    })

    describe('When Optimizely returns false', () => {
      it('Then isOptimizelyFeatureEnabled should be false', async () => {
        const useIsOptimizelyFeatureEnabledValue = false
        mockUseIsOptimizelyFeatureEnabled.mockReturnValue(useIsOptimizelyFeatureEnabledValue)

        const WithOptimizelyWrappedComponent = withOptimizelyHOCModule.withOptimizelyHOC(
          mockClassComponent,
          mockFeatureFlag,
        )
        const wrapper = shallow(<WithOptimizelyWrappedComponent {...mockClassComponentProps} />)

        const isOptimizelyFeatureEnabled = await wrapper.props().isOptimizelyFeatureEnabled

        expect(isOptimizelyFeatureEnabled).toEqual(useIsOptimizelyFeatureEnabledValue)
        expect(mockWithOptimizelyHOC).toHaveBeenCalledTimes(1)
        expect(mockWithOptimizelyHOC).toHaveBeenCalledWith(mockClassComponent, mockFeatureFlag)
      })
    })
  })

  describe('When Functional component is wrapped in HOC', () => {
    describe('When Optimizely is loading', () => {
      it('Then isOptimizelyFeatureEnabled should be null', async () => {
        const useIsOptimizelyFeatureEnabledValue = null
        mockUseIsOptimizelyFeatureEnabled.mockReturnValue(useIsOptimizelyFeatureEnabledValue)

        const WithOptimizelyWrappedComponent = withOptimizelyHOCModule.withOptimizelyHOC(
          mockFunctionalComponent,
          mockFeatureFlag,
        )
        const wrapper = shallow(<WithOptimizelyWrappedComponent />)

        const isOptimizelyFeatureEnabled = await wrapper.props().isOptimizelyFeatureEnabled

        expect(isOptimizelyFeatureEnabled).toEqual(useIsOptimizelyFeatureEnabledValue)
        expect(mockWithOptimizelyHOC).toHaveBeenCalledTimes(1)
        expect(mockWithOptimizelyHOC).toHaveBeenCalledWith(mockFunctionalComponent, mockFeatureFlag)
      })
    })

    describe('When Optimizely returns true', () => {
      it('Then isOptimizelyFeatureEnabled should be true', async () => {
        const useIsOptimizelyFeatureEnabledValue = true
        mockUseIsOptimizelyFeatureEnabled.mockReturnValue(useIsOptimizelyFeatureEnabledValue)

        const WithOptimizelyWrappedComponent = withOptimizelyHOCModule.withOptimizelyHOC(
          mockFunctionalComponent,
          mockFeatureFlag,
        )
        const wrapper = shallow(<WithOptimizelyWrappedComponent />)

        const isOptimizelyFeatureEnabled = await wrapper.props().isOptimizelyFeatureEnabled

        expect(isOptimizelyFeatureEnabled).toEqual(useIsOptimizelyFeatureEnabledValue)
        expect(mockWithOptimizelyHOC).toHaveBeenCalledTimes(1)
        expect(mockWithOptimizelyHOC).toHaveBeenCalledWith(mockFunctionalComponent, mockFeatureFlag)
      })
    })

    describe('When Optimizely returns false', () => {
      it('Then isOptimizelyFeatureEnabled should be false', async () => {
        const useIsOptimizelyFeatureEnabledValue = false
        mockUseIsOptimizelyFeatureEnabled.mockReturnValue(useIsOptimizelyFeatureEnabledValue)

        const WithOptimizelyWrappedComponent = withOptimizelyHOCModule.withOptimizelyHOC(
          mockFunctionalComponent,
          mockFeatureFlag,
        )
        const wrapper = shallow(<WithOptimizelyWrappedComponent />)

        const isOptimizelyFeatureEnabled = await wrapper.props().isOptimizelyFeatureEnabled

        expect(isOptimizelyFeatureEnabled).toEqual(useIsOptimizelyFeatureEnabledValue)
        expect(mockWithOptimizelyHOC).toHaveBeenCalledTimes(1)
        expect(mockWithOptimizelyHOC).toHaveBeenCalledWith(mockFunctionalComponent, mockFeatureFlag)
      })
    })
  })
})
