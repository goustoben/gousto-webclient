// setup file
import 'whatwg-fetch'
import '@testing-library/jest-dom/extend-expect'
import MutationObserver from '@sheerun/mutationobserver-shim'
// Endpoints need to be setup before MSW
import './.setupEndpoints.js'
import { cache } from "swr"
import { helpers } from "./.msw"
import { waitFor } from '@testing-library/react'

const Enzyme = require('enzyme');
const EnzymeAdapter = require('@wojtekmaj/enzyme-adapter-react-17');

import Modal from 'react-modal'

global.MutationObserver = global.MutationObserver || MutationObserver

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    }
  }

if (!Object.entries) {
  Object.entries = function(obj) {
    const ownProps = Object.keys(obj)
    let i = ownProps.length
    const resArray = new Array(i) // preallocate the Array

    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]]
    }

    return resArray
  }
}

Enzyme.configure({ adapter: new EnzymeAdapter() });

jest
  .spyOn(Modal, "setAppElement")
  .mockImplementation(() => {});

// This is a global test helper
const $T = {
  ...helpers,
}

global.$T = $T

// We can only declare one afterEach in this file
// issue with clearing cache https://github.com/vercel/swr/issues/781
afterEach(async () => {
  $T.setUserId()
  cache.clear()
  await new Promise(requestAnimationFrame)
})
