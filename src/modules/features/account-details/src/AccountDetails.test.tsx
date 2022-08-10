// import '@testing-library/jest-dom'

import React from 'react'
import { render, screen } from '@testing-library/react'
import { AccountDetails } from './AccountDetails'

describe('AccountDetails', () => {
  test('retuns an empty div', () => {
    render(<AccountDetails />)

    const accountDetailsEl = screen.getByTestId('account-details')

    expect(accountDetailsEl).toBeInTheDocument();
  })
})
