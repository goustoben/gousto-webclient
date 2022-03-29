// This is to pass the type check for jest-dom extending expect
import '@testing-library/jest-dom';
import React from 'react'
import { render, screen } from '@testing-library/react'
import { safeJestMock } from '_testing/mocks'
import * as OptimizelyHooks from './useOptimizely.hook'
import { OptimizelyFeature } from './OptimizelyFeature'

const mockedGetOptimizelyInstance = safeJestMock(OptimizelyHooks, 'useIsOptimizelyFeatureEnabled')

describe('OptimizelyFeature', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When the optimizely is loading', () => {
    it('should not render the children', () => {
      mockedGetOptimizelyInstance.mockReturnValue(null)

      render(<OptimizelyFeature name="feature" enabled>hello</OptimizelyFeature>)

      expect(screen.queryByText('hello')).not.toBeInTheDocument()
    })
  })

  describe('When the optimizely is loaded', () => {
    describe('When the optimizely feature returns as enabled', () => {
      beforeEach(() => {
        mockedGetOptimizelyInstance.mockReturnValue(true)
      })

      describe('When the OptimizelyFeature has `enabled` set to true', () => {
        it('should render the children', () => {
          render(<OptimizelyFeature name="feature" enabled>hello</OptimizelyFeature>)

          expect(screen.queryByText('hello')).toBeInTheDocument()
        })
      })

      describe('When the OptimizelyFeature has `enabled` set to false', () => {
        it('should not render the children', () => {
          render(<OptimizelyFeature name="feature" enabled={false}>hello</OptimizelyFeature>)

          expect(screen.queryByText('hello')).not.toBeInTheDocument()
        })
      })
    })

    describe('When the optimizely feature returns as enabled', () => {
      beforeEach(() => {
        mockedGetOptimizelyInstance.mockReturnValue(false)
      })

      describe('When the OptimizelyFeature has `enabled` set to true', () => {
        it('should not render the children', () => {
          render(<OptimizelyFeature name="feature" enabled>hello</OptimizelyFeature>)

          expect(screen.queryByText('hello')).not.toBeInTheDocument()
        })
      })

      describe('When the OptimizelyFeature has `enabled` set to false', () => {
        it('should render the children', () => {
          render(<OptimizelyFeature name="feature" enabled={false}>hello</OptimizelyFeature>)

          expect(screen.queryByText('hello')).toBeInTheDocument()
        })
      })
    })
  })
})
