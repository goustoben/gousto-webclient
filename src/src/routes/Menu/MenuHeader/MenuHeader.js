import React from 'react'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { getIsAuthenticated } from 'selectors/auth'
import { getIsInWizardFunnel } from 'selectors/signup'
import { Header } from 'Header'
import { useSelector } from 'react-redux'

export const MenuHeader = () => {
  const isFeatureOn = useIsOptimizelyFeatureEnabled('beetroots_menu_nav_links_hidden_after_wizard_web_enabled')
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isInWizardFunnel = useSelector(getIsInWizardFunnel)
  const isSimpleHeader = isInWizardFunnel && !isAuthenticated && isFeatureOn

  return <Header simple={isSimpleHeader} />
}
