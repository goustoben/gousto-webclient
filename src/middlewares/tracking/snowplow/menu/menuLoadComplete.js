export const menuLoadComplete = (action) => {
  return {
    type: action.type,
    data: {
      timeToLoadMs: action.timeToLoadMs,
      useMenuService: action.useMenuService
    }
  }
}
