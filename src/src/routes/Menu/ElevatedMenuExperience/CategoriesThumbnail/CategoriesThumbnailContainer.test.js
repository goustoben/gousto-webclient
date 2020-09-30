import React from 'react'
import { shallow } from 'enzyme'
import { CategoriesThumbnailContainer } from './CategoriesThumbnailContainer'

describe('CategoriesThumbnailContainer', () => {
  let wrapper

  test('should map thumbnail from state to prop', () => {
    const state = {
      menuService: {
        data: [{
          id: '222',
          relationships: {
            collections: {
              data: [{
                id: 222,
                meta: {
                  thumbnail: 'imageUrl'
                }
              }]
            }
          },
          attributes: {
            ends_at: `${(new Date()).getFullYear() + 1}-11-20 14:52:10.242845+00:00`
          }
        }
        ]
      },
    }
    wrapper = shallow(<CategoriesThumbnailContainer collectionId={222} />, {
      context: {
        store: {
          getState: () => state,
          dispatch: () => {},
          subscribe: () => {}
        }
      }
    })
    expect(wrapper.find('CategoriesThumbnail').prop('thumbnail')).toEqual('imageUrl')
  })
})
