import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import { CTACard } from './CTACard'
import { CTAToAllRecipesContainer } from '../../Recipe/CTAToAllRecipes/CTAToAllRecipesContainer'
import { CTAThematic } from '../../Recipe/CTAThematic'

jest.mock('moment')

describe('CTACard', () => {
  describe('when thematic name is provided', () => {
    const thematicName = 'gousto-x-wagamama'

    describe('when delivery date is provided', () => {
      const deliveryDate = '2011-10-05T14:48:00.000Z'

      test('should render CTAThematic with thematic name and delivery date', () => {
        const wrapper = shallow(<CTACard thematicName={thematicName} deliveryDate={deliveryDate} />)

        const ctaThematic = wrapper.find(CTAThematic)

        expect(ctaThematic.prop('name')).toBe(thematicName)
        expect(ctaThematic.prop('selectedDate')).toBe(deliveryDate)
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

      test('should render CTAThematic with thematic name and delivery date', () => {
        const wrapper = shallow(<CTACard thematicName={thematicName} />)

        const ctaThematic = wrapper.find(CTAThematic)

        expect(ctaThematic.prop('name')).toBe(thematicName)
        expect(ctaThematic.prop('selectedDate')).toBe(mockMomentDate)
      })
    })
  })

  describe('when current collection is recommendation', () => {
    test('should render CTAToAllRecipesContainer', () => {
      const wrapper = shallow(<CTACard isCurrentCollectionRecommendation />)

      expect(wrapper.find(CTAToAllRecipesContainer).length).toEqual(1)
    })
  })

  describe('when current collection is not recommendation and no thematic name provided', () => {
    test('should return null', () => {
      const wrapper = shallow(<CTACard isCurrentCollectionRecommendation={false} thematicName={null} />)

      expect(wrapper.getElement()).toBe(null)
    })
  })
})
