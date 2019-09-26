import { redirect } from 'actions/redirect'
import routes from 'config/routes'

export const choosePlanContinue = () => (redirect(routes.client['check-out']))
