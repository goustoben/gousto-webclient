import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { RoundelImage } from 'routes/Menu/Recipe/RoundelImage'

describe('<RoundelImage />', () => {
  let wrapper
  const roundelImage = Immutable.fromJS({
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
              src: 'RoundelImage.jpg',
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
    wrapper = shallow(<RoundelImage />)
    expect(wrapper.find('img').length).toEqual(0)
  })

  test('should render roundel image', () => {
    wrapper = shallow(<RoundelImage roundelImage={roundelImage} />)
    expect(wrapper.find('img').length).toEqual(1)
  })
})
