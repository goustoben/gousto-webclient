import Immutable from 'immutable'
import config from 'config/head/optimizely'
import { canUseWindow } from 'utils/browserEnvironment'
const htmlTemplate = require('../template')

// mock transit in encodeState
jest.mock('transit-immutable-js')
jest.mock('utils/browserEnvironment')
jest.mock('utils/isomorphicEnvironment', () => ({
  getEnvironment: () => 'local',
  getDomain: () => 'gousto.local',
  getProtocol: () => 'http:',
  isDev: () => false
}))

describe('htmlTemplate', () => {
  let initialState
  let helmetHead
  let scripts
  let output

  beforeEach(() => {
    jest.resetAllMocks()
    canUseWindow.mockReturnValue(false)
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
        output = htmlTemplate('', initialState, '', scripts, helmetHead)
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
        output = htmlTemplate('', initialState, '', scripts, helmetHead)
        expect(output).not.toContain(DEFAULT_HTML_TAG)
        expect(output).toContain(EXPECT_HTML_TAG)
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
        output = htmlTemplate('', initialState, '', scripts, helmetHead)
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
        output = htmlTemplate('', initialState, '', scripts, helmetHead)
        expect(output).toContain(TITLE_TAG)
      })
    })
  })

  describe('optimizely', () => {
    // eslint-disable-next-line dot-notation
    const TEST_ENVIRONMENT = config['local']
    const CDN_OPTIMIZELY = `<script src="//cdn.optimizely.com/js/${TEST_ENVIRONMENT}.js" defer></script>`
    beforeEach(() => {
      helmetHead = {}
      output = ''
    })

    describe('when scripts has no optimizely key property', () => {
      test('should not contain cdn.optimizely script tag', () => {
        output = htmlTemplate('', initialState, '', scripts, helmetHead)
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
        output = htmlTemplate('', initialState, '', scripts, helmetHead)
        expect(output).toContain(CDN_OPTIMIZELY)
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
        output = htmlTemplate('', initialState, '', scripts, helmetHead)
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
        output = htmlTemplate('', initialState, '', scripts, helmetHead)
        expect(output).toContain(LINK_TAG)
      })
    })
  })
})
