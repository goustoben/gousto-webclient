export const mockWindowLocationAssign = () => {
  delete window.location

  // @ts-ignore
  window.location = {
    // @ts-ignore
    assign: jest.fn(),
  }

  return window.location.assign
}
