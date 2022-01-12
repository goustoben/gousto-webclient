import React from 'react'
import { getIsAuthenticated } from 'selectors/auth'
import { getIsInWizardFunnel } from 'selectors/signup'
import { Header } from 'Header'
import { useSelector } from 'react-redux'

export const MenuHeader = () => {
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isInWizardFunnel = useSelector(getIsInWizardFunnel)
  const isSimpleHeader = isInWizardFunnel && !isAuthenticated

  return <Header simple={isSimpleHeader} />
}
