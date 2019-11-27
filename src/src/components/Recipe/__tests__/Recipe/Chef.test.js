import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Chef from 'Recipe/Chef'

describe('<Chef />', () => {
  let wrapper
  const chef = Immutable.fromJS({
    name: 'Shu Han Lee ',
    celebrity: true,
    media: {
      images: [
        {
          title: 'Shu Han Lee',
          description: '',
          type: 'signature-image',
          urls: [
            {
              src: 'Chef.jpg',
              width: 0,
            },
          ],
        },
        {
          title: 'Shu Han Lee.sig',
          description: '',
          type: 'headshot-image',
          urls: [
            {
              src: 'Signature.jpg',
              width: 0,
            },
          ],
        },
      ],
    },
  })

  test('should not render img by default', () => {
    wrapper = shallow(<Chef />)
    expect(wrapper.find('img').length).toEqual(0)
  })

  test('should render chef image', () => {
    wrapper = shallow(<Chef chef={chef} />)
    expect(wrapper.find('img').length).toEqual(1)
  })
})
