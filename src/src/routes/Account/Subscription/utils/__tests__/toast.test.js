import { getSubscriptionToastContent } from '../toast'

jest.mock('uuid', () => ({
  v4: () => 'mock-uuid'
}))

describe('getSubscriptionToastContent', () => {
  describe('Given isSuccess is true', () => {
    test('Then the expected payload is returned', () => {
      const payload = getSubscriptionToastContent(true)

      expect(payload).toEqual({
        body: 'Your subscription details have been successfully updated',
        canDismiss: false,
        displayTime: 'long',
        id: 'mock-uuid',
        title: 'Updated successfully',
        variant: 'success'
      })
    })
  })

  describe('Given isSuccess is false', () => {
    test('Then the expected payload is returned', () => {
      const payload = getSubscriptionToastContent(true)

      expect(payload).toEqual({
        body: 'Your subscription details have been successfully updated',
        canDismiss: false,
        displayTime: 'long',
        id: 'mock-uuid',
        title: 'Updated successfully',
        variant: 'success'
      })
    })
  })
})
