import React from 'react'

import { act, render, screen } from '@testing-library/react'
import { Recaptcha } from 'Recaptcha'

jest.mock('apis/fetchS3', () => ({
  fetchFeatures: jest
    .fn()
    .mockResolvedValueOnce({ data: { isRecaptchaEnabled: false } })
    .mockResolvedValueOnce({ data: { isRecaptchaEnabled: true } }),
}))

jest.mock('utils/isomorphicEnvironment', () => ({
  getRecaptchaPublicKey: () => 'recaptcha-public-key',
}))

jest.mock('utils/logger')

const testId = 'testId'

describe('given <Recaptcha />', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<Recaptcha data-testid={testId} />)
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when isRecaptchaEnabled flag is disabled', () => {
    test('then it is not rendered', () => {
      expect(screen.queryByTestId(testId)).toBeNull()
    })
  })

  describe('when isRecaptchaEnabled flag is enabled', () => {
    test('then it is rendered', () => {
      expect(screen.queryByTestId(testId)).toBeInTheDocument()
    })
  })
})
