export const mockWindowLocationAssign = () => {
  delete window.location

  window.location = {
    // TODO: Fix the eslint rules for this
    // eslint-disable-next-line no-undef
    assign: jest.fn(),
  }

  return window.location.assign
}
