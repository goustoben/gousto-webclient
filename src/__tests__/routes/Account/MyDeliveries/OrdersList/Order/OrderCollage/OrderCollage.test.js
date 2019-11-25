import React from 'react'
import Immutable from 'immutable' // eslint-disable-line no-caps
import { shallow, mount } from 'enzyme'

import OrderCollage from 'routes/Account/MyDeliveries/OrdersList/Order/OrderCollage'
import css from 'routes/Account/MyDeliveries/OrdersList/Order/OrderCollage/OrderCollage.css'

describe('OrderCollage', () => {
  let wrapper
  let recipes

  describe('rendering', () => {
    beforeEach(() => {
      recipes = Immutable.Map({})
      wrapper = shallow(<OrderCollage recipes={recipes} />)
    })

    test('should render a <div> with no props', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should render one collageContainer', () => {
      const className = `.${css.collageContainer.split(' ').join('.')}`
      expect(wrapper.find(className)).toHaveLength(1)
    })

    test('should always render four elements with collageItem class', () => {
      wrapper = mount(<OrderCollage recipes={recipes} />)
      const className = `.${css.emptyItem.split(' ').join('.')}`
      expect(wrapper.find(className)).toHaveLength(4)
    })

    describe('renders the correct number of images', () => {
      test('should render *n* <img> components where *n* is recipes length', () => {
        recipes = Immutable.fromJS({
          1: {
            image: 'https://external-img.jpg',
            recipeTitle: 'Cheesy Pangasius',
          },
          2: {
            image: 'https://external-img.jpg',
            recipeTitle: 'Cheesy Pangasius',
          },
          3: {
            image: 'https://external-img.jpg',
            recipeTitle: 'Cheesy Pangasius',
          },
          4: {
            image: 'https://external-img.jpg',
            recipeTitle: 'Cheesy Pangasius',
          },
        })
        wrapper = mount(<OrderCollage isCommitted recipes={recipes} />)
        expect(wrapper.find('img').length).toBe(4)

        recipes = Immutable.fromJS({
          1: {
            image: 'https://external-img.jpg',
            recipeTitle: 'Cheesy Pangasius',
          },
          2: {
            image: 'https://external-img.jpg',
            recipeTitle: 'Cheesy Pangasius',
          },
        })
        wrapper = mount(<OrderCollage recipes={recipes} />)
        expect(wrapper.find('img').length).toBe(2)
      })

      describe('when an image with no image url is passed', () => {
        test('should render a placeholder image', () => {
          recipes = Immutable.Map({
            1: Immutable.Map({
              image: '',
              recipeTitle: '',
            }),
          })

          wrapper = shallow(<OrderCollage recipes={recipes} />)
          expect(wrapper.find('Image').prop('media')).toEqual('recipe-placeholder.png')
        })

        describe('when an image with a url is passed', () => {
          test('should render an image', () => {
            recipes = Immutable.Map({
              2: Immutable.Map({
                image: 'https://cloud.com/image.jpg',
                recipeTitle: 'Recipe with an image',
              })
            })

            wrapper = shallow(<OrderCollage recipes={recipes} />)
            expect(wrapper.find('Image').prop('media')).toEqual('https://cloud.com/image.jpg')
          })
        })
      })
    })
  })
})
