import { appsRedirect } from '../../../server/middleware/apps'

jest.mock('config/apps', () => ({
  appStoreLink: 'APP_STORE_LINK',
  playStoreLink: 'PLAY_STORE_LINK',
}))

const getContext = (url, userAgent, {querystring} = {}) => ({
  request: {
    url,
    querystring,
    header: {
      'user-agent': userAgent,
    },
  },
  redirect: jest.fn(),
})

describe('appsRedirect', () => {
  let ctx
  let next

  beforeEach(() => {
    next = jest.fn()
  })

  describe('when request is not /apps', () => {
    test('should call next', () => {
      ctx = getContext('/', 'N/A')
      appsRedirect(ctx, next)

      expect(next).toHaveBeenCalled()
      expect(ctx.redirect).not.toHaveBeenCalled()
    })
  })

  describe('when request is /apps', () => {
    test('should not call next', () => {
      ctx = getContext('/apps', 'N/A')
      appsRedirect(ctx, next)

      expect(next).not.toHaveBeenCalled()
      expect(ctx.redirect).toHaveBeenCalled()
    })

    test('should redirect an Android user to the play store', () => {
      ctx = getContext(
        '/apps',
        'Mozilla/5.0 (Linux; Android 8.0.0; SM-G965F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.137 Mobile Safari/537.36',
      )
      appsRedirect(ctx, next)

      expect(ctx.redirect).toHaveBeenCalledWith('PLAY_STORE_LINK')
    })

    test('should redirect an Android user to the play store with query string', () => {
      ctx = getContext(
        '/apps?ABC=xyz',
        'Mozilla/5.0 (Linux; Android 8.0.0; SM-G965F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.137 Mobile Safari/537.36',
        { querystring: 'ABC=xyz'}
      )
      appsRedirect(ctx, next)

      expect(ctx.redirect).toHaveBeenCalledWith('PLAY_STORE_LINK?ABC=xyz')
    })

    test('should redirect an iOS user to the app store', () => {
      ctx = getContext(
        '/apps',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
      )
      appsRedirect(ctx, next)

      expect(ctx.redirect).toHaveBeenCalledWith('APP_STORE_LINK')
    })

    test('should redirect an iOS user to the app store', () => {
      ctx = getContext(
        '/apps?okay=1',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        { querystring: 'okay=1'}
      )
      appsRedirect(ctx, next)

      expect(ctx.redirect).toHaveBeenCalledWith('APP_STORE_LINK?okay=1')
    })

    test('should redirect anyone else to the homepage', () => {
      ctx = getContext('/apps', 'N/A')
      appsRedirect(ctx, next)

      expect(ctx.redirect).toHaveBeenCalledWith('/')
    })

    test('should redirect anyone else to the homepage with queryString', () => {
      ctx = getContext('/apps?test=true', 'N/A', { querystring: 'test=true'})
      appsRedirect(ctx, next)

      expect(ctx.redirect).toHaveBeenCalledWith('/?test=true')
    })
  })
})
