import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import Helmet from 'react-helmet'

import { RecipeMeta } from 'RecipeMeta'

describe('RecipeMeta', () => {
  const recipe = Immutable.fromJS({
    id: '12345',
    title: 'A Recipe Title',
    description: `The best you've ever tasted.`,
    media: {
      images: [{
        urls: [{
          src: 'protocol://imageurl.com/image.jpg',
          width: 700,
        }],
      }],
    },
    taxonomy: [
      {},
      {
        id: 2,
        name: "Food Brands",
        slug: "food-brands",
        tags: [
          {
            id: "9",
            name: "Great Food",
            properties: {
              ribbon_color: "#000000",
              border_color: "#222222",
              text_color: "#FFFFFF",
            },
            slug: "great-food",
          }
        ]
      }
    ]
  })

  it('should render helmet component if recipe exists', () => {
    const wrapper = shallow(<RecipeMeta recipe={recipe} />)

    expect(wrapper.find(Helmet).length).toEqual(1)
  })

  it('should render nothing if recipe does not exist', () => {
    const wrapper = shallow(<RecipeMeta recipe={null} />)

    expect(wrapper.find(Helmet).length).toEqual(0)
  })

  test('should render meta tags', () => {
    const wrapper = shallow(<RecipeMeta recipe={recipe} />)
    const meta = wrapper.find(Helmet).first().prop('meta')

    expect(meta).toMatchSnapshot()
  })
})
