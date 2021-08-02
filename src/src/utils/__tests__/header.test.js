import { getLinkURL } from 'utils/header'
import { client } from 'config/routes'

describe('header utils', () => {
  describe('getLinkURL', () => {
    let result
    let props

    describe('when isMenuRedirectPageEnabled is true and there is no postcode', () => {
      beforeEach(() => {
        props = {
          menuItem: {
            url: client.menu
          },
          isMenuRedirectPageEnabled: true,
        }
      })

      describe('and a user is not authenticated', () => {
        beforeEach(() => {
          props = {
            ...props,
            isAuthenticated: false,
          }
        })

        test('then should return url for Menu redirect page', () => {
          result = getLinkURL(props)
          expect(result).toBe(client.menu2)
        })
      })

      describe('and a user is authenticated', () => {
        beforeEach(() => {
          props = {
            ...props,
            isAuthenticated: false,
          }
        })

        test('then should return url for Menu redirect page', () => {
          result = getLinkURL(props)
          expect(result).toBe(client.menu2)
        })
      })
    })

    describe('when isMenuRedirectPageEnabled is true and postcode is defined', () => {
      beforeEach(() => {
        props = {
          menuItem: {
            url: client.menu,
          },
          isAuthenticated: false,
          isMenuRedirectPageEnabled: true,
          postCode: 'W3 7UP',
        }
      })

      test('then should return url for menu page', () => {
        result = getLinkURL(props)
        expect(result).toBe(client.menu)
      })
    })

    describe('when isMenuRedirectPageEnabled is false', () => {
      beforeEach(() => {
        props = {
          isMenuRedirectPageEnabled: false,
          menuItem: {
            url: client.weCare
          },
        }
      })

      test('then should return url for sustainability page', () => {
        result = getLinkURL(props)
        expect(result).toBe(client.weCare)
      })
    })
  })
})
