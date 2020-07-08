import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { RoundelImageContainer } from './RoundelImageContainer'

describe('<RoundelImageContainer />', () => {
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

  const recipeId = '123'

  const state = {
    recipes: Immutable.fromJS({
      [recipeId]: {
        roundelImage
      }
    })
  }

  const wrapperOptions = {
    context: {
      store: {
        getState: () => state,
        dispatch: () => {},
        subscribe: () => {},
      }
    }
  }

  const wrapper = shallow(
    <RoundelImageContainer recipeId={recipeId} />,
    wrapperOptions
  )

  test('should pass down correct props', () => {
    expect(wrapper.prop('roundelImage')).toEqual(roundelImage)
  })
})
