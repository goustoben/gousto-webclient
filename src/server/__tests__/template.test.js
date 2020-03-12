import Immutable from 'immutable'
import config from 'config/head/optimizely'
const htmlTemplate = require('../template')

// mock transit in encodeState
jest.mock('transit-immutable-js')

describe('htmlTemplate', () => {
  let initialState
  let helmetHead
  let scripts
  let output
  let host

  beforeEach(() => {
    helmetHead = {}
    scripts = {}
    // mock [auth] to prevent mocking the the entire './head'
    initialState = {
      auth: {
        get: jest.fn(() => false)
      },
    }
  })

  describe('htmlAttributes', () => {
    const dirAttribute = 'dir="ltr"'
    const DEFAULT_HTML_TAG = '<html lang="en-GB" >'
    const EXPECT_HTML_TAG = `<html lang="en-GB" ${dirAttribute}>`

    beforeEach(() => {
      output = ''
    })

    describe('when no htmlAttributes passed', () => {
      test('should have default lang attr w/o any addtional attributes', () => {
        output = htmlTemplate('', initialState, {}, '', scripts, helmetHead, host)
        expect(output).toContain(DEFAULT_HTML_TAG)
      })
    })

    describe('when htmlAttributes passed', () => {
      beforeEach(() => {
        helmetHead = {
          htmlAttributes: {
            toString: jest.fn(() => dirAttribute)
          }
        }
      })

      test('should apply passed htmlAttributes to html tag', () => {
        output = htmlTemplate('', initialState, {}, '', scripts, helmetHead, host)
        expect(output).not.toContain(DEFAULT_HTML_TAG)
        expect(output).toContain(EXPECT_HTML_TAG)
      })
    })
  })

  describe('host', () => {
    const META_ROBOTS = '<meta name="robots" content="noindex">'
    const PRODUCTION_FRONTEND_CDN_HOST = 'production-frontend.gousto.co.uk'

    beforeEach(() => {
      output = ''
      host = ''
    })

    describe('when host did not meet the CDN-URL condition', () => {
      test('should not contain robots meta tag', () => {
        output = htmlTemplate('', initialState, {}, '', scripts, helmetHead, host)
        expect(output).not.toContain(META_ROBOTS)
      })
    })

    describe('when host match and passed the CDN-URL condition', () => {
      beforeEach(() => {
        host = PRODUCTION_FRONTEND_CDN_HOST
      })

      test('should contain robots meta tag with noindex attr', () => {
        output = htmlTemplate('', initialState, {}, '', scripts, helmetHead, host)
        expect(output).toContain(META_ROBOTS)
      })
    })
  })

  describe('title', () => {
    const TITLE_TAG = '<title>Recipe boxs</title>'

    beforeEach(() => {
      output = ''
    })

    describe('when no title passed', () => {
      test('should not contain title tag', () => {
        output = htmlTemplate('', initialState, {}, '', scripts, helmetHead, host)
        expect(output).not.toContain(TITLE_TAG)
      })
    })

    describe('when have title passed', () => {
      beforeEach(() => {
        helmetHead = {
          title: {
            toString: jest.fn(() => TITLE_TAG)
          }
        }
      })

      test('should contain title tag', () => {
        output = htmlTemplate('', initialState, {}, '', scripts, helmetHead, host)
        expect(output).toContain(TITLE_TAG)
      })
    })
  })

  describe('optimizely', () => {
    // eslint-disable-next-line no-underscore-dangle
    const CDN_OPTIMIZELY = `<script src="//cdn.optimizely.com/js/${config[__ENV__]}.js" defer></script>`
    beforeEach(() => {
      helmetHead = {}
      output = ''
    })

    describe('when scripts has no optimizely key property', () => {
      test('should not contain cdn.optimizely script tag', () => {
        output = htmlTemplate('', initialState, {}, '', scripts, helmetHead, host)
        expect(output).not.toContain(CDN_OPTIMIZELY)
      })
    })

    describe('when scripts has optimizely key property and initialState has features set', () => {
      beforeEach(() => {
        initialState = {
          features: Immutable.fromJS({}),
          auth: {
            get: jest.fn(() => false)
          },
        }
        scripts = {
          optimizely: {}
        }
      })
      test('should contain cdn.optimizely script tag', () => {
        output = htmlTemplate('', initialState, {}, '', scripts, helmetHead, host)
        expect(output).toContain(CDN_OPTIMIZELY)
      })
    })
  })

  describe('queueit', () => {
    const STATIC_QUEUE_IT = '<script type="text/javascript" src="https://static.queue-it.net/script/queueclient.min.js"></script>'

    beforeEach(() => {
      output = ''
      initialState = {
        auth: {
          get: jest.fn(() => false)
        },
      }
    })

    describe('when is not authenticated', () => {
      test('should contain static.queue-it script tag', () => {
        output = htmlTemplate('', initialState, {}, '', scripts, helmetHead, host)
        expect(output).toContain(STATIC_QUEUE_IT)
      })
    })

    describe('when isAuthenticated', () => {
      beforeEach(() => {
        initialState = {
          auth: {
            get: jest.fn(() => true)
          },
        }
      })

      test('should not contain static.queue-it script tag', () => {
        output = htmlTemplate('', initialState, {}, '', scripts, helmetHead, host)
        expect(output).not.toContain(STATIC_QUEUE_IT)
      })
    })
  })

  describe('link', () => {
    const LINK_TAG = '<link rel="stylesheet" href="mock.css"/>'

    beforeEach(() => {
      helmetHead = {}
      output = ''
    })

    describe('when no link tags are passed', () => {
      test('should not contain mock.css link tag', () => {
        output = htmlTemplate('', initialState, {}, '', scripts, helmetHead, host)
        expect(output).not.toContain(LINK_TAG)
      })
    })

    describe('when link tags passed', () => {
      beforeEach(() => {
        helmetHead = {
          link: {
            toString: jest.fn(() => LINK_TAG)
          }
        }
      })

      test('should contain mock.css link tag', () => {
        output = htmlTemplate('', initialState, {}, '', scripts, helmetHead, host)
        expect(output).toContain(LINK_TAG)
      })
    })
  })
})
