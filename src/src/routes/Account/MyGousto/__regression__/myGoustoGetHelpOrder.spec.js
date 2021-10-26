import { withPlatformTags, MOBILE, WEB } from '../../../../utils/regression/tags'
import { initialize } from './pageUtils/myGousto'
import { selectHeader, selectCTA } from './pageUtils/getHelpLastDelivery'

describe('My Gousto', () => {
  describe('when I have had an order before', () => {
    const expectedSuccessfullHeader = 'Last delivery'
    const expectedSuccessfullCTA = '/get-help?orderId=13722513'

    beforeEach(() => {
      initialize()
    })

    withPlatformTags(WEB).describe('and when on web', () => {
      it('should see my last delivery', () => {
        selectHeader().contains(expectedSuccessfullHeader)
      })

      it('should be able to click the CTA to be redirected to the help centre page for my order ID', () => {
        selectCTA().should('have.attr', 'href', expectedSuccessfullCTA)
      })
    })

    withPlatformTags(MOBILE).describe('and when on mobile', () => {
      it('should see my last delivery', () => {
        selectHeader().contains(expectedSuccessfullHeader)
      })

      it('should be able to click the CTA to be redirected to the help centre page for my order ID', () => {
        selectCTA().should('have.attr', 'href', expectedSuccessfullCTA)
      })
    })
  })
})

