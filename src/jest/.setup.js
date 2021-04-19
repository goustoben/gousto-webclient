// setup file
import fs from "fs";
import JSON5 from "json5"

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');
import Modal from 'react-modal'

require('jest-fetch-mock').enableMocks()

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

const config = JSON5.parse(fs.readFileSync('config/default.json5'))
global.__ENDPOINTS__ = config.endpoints
