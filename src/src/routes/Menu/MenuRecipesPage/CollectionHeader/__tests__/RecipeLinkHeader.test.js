import React from 'react'
import { mount } from 'enzyme'
import { RecipeLinkHeader} from '../RecipeLinkHeader'

describe('RecipeLinkHeader', () => {
  let wrapper
  let headerAttributes
  global.innerWidth = 1500

  describe('when headerImage is defined', () => {
    beforeEach(() => {
      headerAttributes = {
        link: {
          collectionSlug: 'gousto-x-marmite',
          collectionId: 'collection-id-1234'
        },
        title: 'Gousto x Marmite',
        description: 'New marmite recipes.',
        titleColor: '#FFFFFF',
        images: {
          single: 'www.header.com/christmas-single.png',
          double: 'www.header.com/christmas-double.png',
        },
        recipes: ['1234','5678'],
        descriptionColor: '#FFFFFF',
        backgroundColor: '#333D47',
        linkColor: '#BBC2FF',
        fdiStyling: false
      }

      wrapper = mount(<RecipeLinkHeader headerAttributes={headerAttributes} />)
    })

    test('should render title', () => {
      expect(wrapper.find('.recipeLinkHeaderTitle').text()).toEqual('Gousto x Marmite')
    })

    test('should render description', () => {
      expect(wrapper.find('.recipeLinkHeaderDescription').text()).toEqual('New marmite recipes.')
    })

    test('should render viewAllLink', () => {
      expect(wrapper.find('a.recipeLinkHeaderViewAllLink').text()).toEqual('View')
    })

    test('should render viewAllLink', () => {
      expect(wrapper.find('LinkRecipeHolder')).toHaveLength(1)
    })
  })
})
