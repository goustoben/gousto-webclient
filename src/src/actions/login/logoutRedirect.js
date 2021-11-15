import windowUtils from "utils/window"

export const logoutRedirect = () => (
  () => {
    windowUtils.redirect('/')
  }
)
