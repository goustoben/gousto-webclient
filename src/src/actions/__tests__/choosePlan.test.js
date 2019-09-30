import { redirect } from 'actions/redirect'
import routes from 'config/routes'
import { choosePlanContinue } from '../choosePlan'

jest.mock('actions/redirect', () => ({
  redirect: jest.fn()
}))

describe('choosePlanContinue', () => {

  it('should call the redirect action', () => {
    choosePlanContinue()

    expect(redirect).toHaveBeenCalledWith(routes.client['check-out'])
  })
})
