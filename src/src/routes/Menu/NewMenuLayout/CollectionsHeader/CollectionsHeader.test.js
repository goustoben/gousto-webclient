import React from 'react'
import { shallow } from 'enzyme'
import { CollectionsHeader } from './CollectionsHeader'

describe('CollectionsHeader', () => {
  describe('When the component is rendered', () => {
    let wrapper
    const collectionTitle = 'Healthy'
    beforeEach(() => {
      wrapper = shallow(<CollectionsHeader currentCollectionTitle={collectionTitle} />)
    })
    test('then the collections title should be displayed in the header ', () => {
      expect(wrapper.find('.titleHeader').text()).toEqual(collectionTitle)
    })
  })
})
