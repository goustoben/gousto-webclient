import { useSelector } from 'react-redux'

export const useLocation = () => useSelector(state => state.routing.locationBeforeTransitions)
