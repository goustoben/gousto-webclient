import { initialize } from './pageUtils/myGousto'
import { selectReferralCount, selectReferralCredit, selectCTA } from './pageUtils/ReferAFriend'

describe('My Gousto', () => {
  describe('when I have succesfully referred friends', () => {
    const expectedSuccessfullReferralCount = 3
    const expectedSuccessfullReferralCredit = 45
    const expectedSuccessfullURL = '/my-referrals'

    beforeEach(() => {
      initialize()
    })

    it('should show me how many friends I have referred and how much credit I have earned', () => {
      selectReferralCount().contains(expectedSuccessfullReferralCount)
      selectReferralCredit().contains(expectedSuccessfullReferralCredit)
    })

    it('should allow me to click the CTA to be redirected to the Free Food page', () => {
      selectCTA().click()
      cy.url().should('include', expectedSuccessfullURL)
    })
  })
})
