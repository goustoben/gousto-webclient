import { client } from 'config/routes'

export const getLinkURL = ({
  menuItem,
  isMenuRedirectPageEnabled,
  isAuthenticated,
  postCode
}) => {
  const isMenuRedirectAvailable = !isAuthenticated && isMenuRedirectPageEnabled && !postCode
  if (menuItem.url === client.menu && isMenuRedirectAvailable) {
    return client.menu2
  }

  return menuItem.url
}
