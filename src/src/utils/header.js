import { client } from 'config/routes'

export const getLinkURL = ({
  isHelpCentreActive,
  menuItem,
  isMenuRedirectPageEnabled,
  isAuthenticated,
  postCode
}) => {
  if (menuItem.name === 'Help' && isHelpCentreActive) {
    return client.helpCentre
  }

  const isMenuRedirectAvailable = !isAuthenticated && isMenuRedirectPageEnabled && !postCode
  if (menuItem.url === client.menu && isMenuRedirectAvailable) {
    return client.menu2
  }

  return menuItem.url
}
