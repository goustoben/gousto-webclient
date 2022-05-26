import React from 'react'

import { render, screen } from '@testing-library/react'

import { PriceComparisonTable } from 'routes/Home/PriceComparisonTable'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest
    .fn()
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => false),
}))

describe('PriceComparisonTableContainer', () => {
  describe('When optimizely is on', () => {
    test('Should render <PriceComparisonTable />', () => {
      const component = render(<PriceComparisonTable />)
      expect(component.container.childElementCount).toBe(1)
      expect(screen.getByTestId('PriceComparisonTable')).toBeDefined()
    })
  })

  describe('When optimizely is off', () => {
    test('Should render empty component', () => {
      const component = render(<PriceComparisonTable />)
      expect(component.container.childElementCount).toBe(0)
    })
  })
})
