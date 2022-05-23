import React from 'react'
import { getIsAuthenticated } from 'selectors/auth'
import { getIsInWizardFunnel } from 'selectors/signup'
import { Header } from 'Header'
import { useSelector } from 'react-redux'
import { useDoubleDeckerNav } from 'hooks/useDoubleDeckerNav'

export const MenuHeader = () => {
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isInWizardFunnel = useSelector(getIsInWizardFunnel)
  const isSimpleHeader = isInWizardFunnel && !isAuthenticated
  const doubleDeckerExperimentEnabled = useDoubleDeckerNav()

  return <Header simple={isSimpleHeader} doubleDeckerExperimentEnabled={doubleDeckerExperimentEnabled} />
}
