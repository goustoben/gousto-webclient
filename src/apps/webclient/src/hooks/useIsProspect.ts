import { useAuth } from 'routes/Menu/domains/auth'

export const useIsProspect = () => {
  const { isAuthenticated } = useAuth()

  return !isAuthenticated
}
