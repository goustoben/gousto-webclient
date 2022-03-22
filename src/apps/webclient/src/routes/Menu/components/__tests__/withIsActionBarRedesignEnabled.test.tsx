import React from 'react'
import { render } from '@testing-library/react'
import { useIsActionBarRedesignEnabled } from 'routes/Menu/hooks/useIsActionBarRedesignEnabled'
import { withIsActionBarRedesignEnabled } from '../withIsActionBarRedesignEnabled'

jest.mock('routes/Menu/hooks/useIsActionBarRedesignEnabled', () => ({
  useIsActionBarRedesignEnabled: jest.fn(),
}))

describe('withIsActionBarRedesignEnabled', () => {
  describe('when component wrapped by withIsActionBarRedesignEnabled is rendered', () => {
    beforeEach(() => {
      ;(useIsActionBarRedesignEnabled as jest.Mock).mockReturnValue(true)
    })

    test('then it should take isActionBarRedesignEnabled prop', () => {
      const BaseComponent = ({
        isActionBarRedesignEnabled,
      }: {
        isActionBarRedesignEnabled: boolean
      }) => <div>{isActionBarRedesignEnabled ? 'yes' : 'no'}</div>
      const ResultingComponent = withIsActionBarRedesignEnabled(BaseComponent)
      const { getByText } = render(<ResultingComponent />)

      expect(getByText('yes')).toBeInTheDocument()
    })
  })
})
