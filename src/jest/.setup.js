// setup file
import '@testing-library/jest-dom/extend-expect'
import MutationObserver from '@sheerun/mutationobserver-shim'
// Endpoints need to be setup before MSW
import './.setupEndpoints.js'
import { cache } from "swr"
import { server } from "./.msw"

const Enzyme = require('enzyme');
const EnzymeAdapter = require('@wojtekmaj/enzyme-adapter-react-17');

import Modal from 'react-modal'
import { Pact } from "@pact-foundation/pact"
import path from "path"

if (global.adapterTest) {
  configureAdapterTestEnvironment()
} else {
  configureEmulatedBrowserEnvironment()
}

function configureAdapterTestEnvironment() {
  jest.setTimeout(30 * 1000)

  const pathOutputDirectoryPath = path.join(__dirname, '..', '..', 'pact')

  const pact = new Pact({
    consumer: 'gousto-webclient',
    provider: global.pactProvider,
    dir: path.join(pathOutputDirectoryPath, 'pacts'),
    pactfileWriteMode: 'update',
    log: path.join(pathOutputDirectoryPath, 'logs', 'pact-file-generation','pact.log'),
    logLevel: process.env.PACT_LOG_LEVEL ? process.env.PACT_LOG_LEVEL : 'error'
  })

  global.pact = pact

  beforeAll(() => pact.setup())

  afterEach(() => pact.verify())

  afterAll(() => pact.finalize())
}

function configureEmulatedBrowserEnvironment() {
  global.MutationObserver = global.MutationObserver || MutationObserver

  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {
        },
        removeListener: function () {
        },
      }
    }

  if (!Object.entries) {
    Object.entries = function (obj) {
      const ownProps = Object.keys(obj)
      let i = ownProps.length
      const resArray = new Array(i) // preallocate the Array

      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]]
      }

      return resArray
    }
  }

  Enzyme.configure({adapter: new EnzymeAdapter()})

  jest
    .spyOn(Modal, "setAppElement")
    .mockImplementation(() => {
    })

// This clears the cache of swr after each test
  afterAll(() => cache.clear())

// Establish API mocking before all tests.
  beforeAll(() => {
    server.listen()
  })

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
  afterEach(() => {
    // If you need logging of the requests, uncomment the following line.
    // server.printHandlers()
    server.resetHandlers()
  })

// Clean up after the tests are finished.
  afterAll(() => server.close())
}
