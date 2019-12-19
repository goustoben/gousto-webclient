import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import Recipe from 'containers/menu/Recipe'
import { CTACard } from '../CTACard'

jest.mock('moment')

describe('CTACard', () => {
  describe('when thematic name is provided', () => {
    const thematicName = 'gousto-x-wagamama'

    describe('when delivery date is provided', () => {
      const deliveryDate = '2011-10-05T14:48:00.000Z'

      test('should render Recipe with thematic name and delivery date', () => {
        const wrapper = shallow(<CTACard thematicName={thematicName} deliveryDate={deliveryDate} />)

        const recipe = wrapper.find(Recipe)

        expect(recipe.prop('thematicName')).toBe(thematicName)
        expect(recipe.prop('selectedDate')).toBe(deliveryDate)
      })
    })

    describe('when delivery date is not provided', () => {
      const mockMomentDate = '2011-10-05T14:48:00.000Z'
      moment.mockReturnValue({
        add: () => ({
          toISOString: () => mockMomentDate
        })
      })

      afterEach(() => {
        moment.mockClear()
      })

      test('should render Recipe with thematic name and delivery date', () => {
        const wrapper = shallow(<CTACard thematicName={thematicName} />)

        const recipe = wrapper.find(Recipe)

        expect(recipe.prop('thematicName')).toBe(thematicName)
        expect(recipe.prop('selectedDate')).toBe(mockMomentDate)
      })
    })
  })

  describe('when current collection is recommendation', () => {
    test('should render Recipe with collectionFilterChange', () => {
      const collectionFilterChange = () => { }
      const wrapper = shallow(<CTACard isCurrentCollectionRecommendation collectionFilterChange={collectionFilterChange} />)

      const recipe = wrapper.find(Recipe)

      expect(recipe.prop('collectionFilterChange')).toBe(collectionFilterChange)
    })
  })

  describe('when current collection is not recommendation and no thematic name provided', () => {
    test('should return null', () => {
      const wrapper = shallow(<CTACard isCurrentCollectionRecommendation={false} thematicName={null} />)

      expect(wrapper.getElement()).toBe(null)
    })
  })
})
