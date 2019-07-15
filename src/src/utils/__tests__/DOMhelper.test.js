import React from 'react'
import { shallow } from 'enzyme'
import ReactDOM from 'react-dom'
import DOMHelper from 'utils/DOMhelper'
jest.mock('react-dom',() => ({
  findDOMNode: jest.fn()
}))

describe('DOMhelper', () => {
  describe('getBoundingClientRect',() => {
    test('should return an empty object when ref is falsy', () => {
      expect(DOMHelper.getBoundingClientRect()).toEqual({})
    })

    test('should call getBoundingClientRect function when available', function() {
      const ref = {
        getBoundingClientRect: () => ({ width: 100, height: 200 }),
      }

      expect(DOMHelper.getBoundingClientRect(ref)).toEqual({ width: 100, height: 200 })
    })
  })

  describe('getFirstMatchingNode', function() {
    let sandbox
    let findDOMNodeSpy

    beforeEach(function() {
      sandbox = jest.fn()
      findDOMNodeSpy = jest.spyOn(ReactDOM, 'findDOMNode')
    })

    afterEach(function() {
      jest.resetAllMocks()
    })

    test('should return undefined if no keys available', function() {
      expect(DOMHelper.getFirstMatchingNode(undefined, { x: 'something' })).toEqual(undefined)
    })

    test('should return undefined if no refs available', function() {
      expect(DOMHelper.getFirstMatchingNode(['x'], undefined)).toEqual(undefined)
    })

    test('should return matching node for first found key in list', function() {
      ReactDOM.findDOMNode.mockReturnValue('node for key2')//eslint-disable-line
      const keys = ['key1', 'key2', 'key3']
      const refs = {
        key0: 'ref for key0',
        key4: 'ref for key4',
        key2: 'ref for key2',
        key6: 'ref for key6',
      }
      const result = DOMHelper.getFirstMatchingNode(keys, refs)
      expect(findDOMNodeSpy.mock.calls).toHaveLength(1)
      expect(findDOMNodeSpy).toBeCalledWith('ref for key2')
      expect(result).toEqual('node for key2')
    })

    test('should return undefined if no matches found', () => {
      const keys = ['key3', 'key4', 'key5']
      const refs = {
        key0: 'ref for key0',
        key1: 'ref for key1',
        key2: 'ref for key2',
      }
      expect(DOMHelper.getFirstMatchingNode(keys, refs)).toEqual(undefined)
    })

    // there is another test in sinon that needs to be migrated but it was taking too long in the current ticket to move - 15 Jul 2019
  })

  describe('scrollToFirstMatchingNode', () => {
    let sandbox
    let getFirstMatchingNodeSpy

    beforeEach(() => {
      sandbox = jest.fn()
      getFirstMatchingNodeSpy = jest.spyOn(DOMHelper, 'getFirstMatchingNode')
    })

    afterEach(() => {
      jest.clearAllMocks
    })

    test('should call getFirstMatchingNode once with keys & refs', () => {
      DOMHelper.scrollToFirstMatchingNode()
      DOMHelper.scrollToFirstMatchingNode(['key1'], { key1: 'ref1' })
      expect(getFirstMatchingNodeSpy.mock.calls).toHaveLength(2)
      expect(getFirstMatchingNodeSpy.mock.calls[0]).toEqual([[], {}])
      expect(getFirstMatchingNodeSpy.mock.calls[1]).toEqual([['key1'], { key1: 'ref1' }])
    })
  })
})
