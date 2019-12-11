export default function loginVisibility(action, state) {
  return {
    type: action.type,
    data: {
      visible: state.loginVisibility,
    },
  }
}
