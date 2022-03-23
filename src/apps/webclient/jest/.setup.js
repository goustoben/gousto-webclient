// setup file
import React from 'react'
import MutationObserver from '@sheerun/mutationobserver-shim'
import { server } from './.msw'
import Modal from 'react-modal'

const Enzyme = require('enzyme');
const EnzymeAdapter = require('@wojtekmaj/enzyme-adapter-react-17');

configureEmulatedBrowserEnvironment()

jest.mock('react-modal', () => {
  const Modal = jest.requireActual('react-modal')
  // `ariaHideApp` is to disable the warning about aria-hidden
  // when using `react-modal` inside our tests.
  const NewModal = (prop) => <Modal {...prop} ariaHideApp={false} />
  NewModal.setAppElement = () => {}

  return NewModal
})

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

// Establish API mocking before all tests.
  beforeAll(() => {
    server.listen()
    // global.environmentMocks = mockEnvironmentAndDomain('production', 'gousto.co.uk')
  })

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
  afterEach(() => {
    // If you need logging of the requests, uncomment the following line.
    // server.printHandlers()
    server.resetHandlers()
  })

// Clean up after the tests are finished.
  afterAll(() => {
    // restoreEnvironmentMocks(global.environmentMocks)
    server.close()
  })
}
