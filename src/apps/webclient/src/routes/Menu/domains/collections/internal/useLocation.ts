import { RootStateOrAny, useSelector } from 'react-redux'

export const useLocation = () =>
  useSelector((state: RootStateOrAny) => state.routing.locationBeforeTransitions)
