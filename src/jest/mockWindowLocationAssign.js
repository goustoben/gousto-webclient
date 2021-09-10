// eslint-disable-next-line import/no-extraneous-dependencies
import * as jest from 'jest'

export const mockWindowLocationAssign = () => {
  delete window.location

  window.location = {
    assign: jest.fn(),
  }

  return window.location.assign
}
