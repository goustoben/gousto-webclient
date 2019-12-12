import React from 'react'
import { shallow } from 'enzyme'
import { CTAThematic } from '../CTAThematic'
import { ThematicImage } from '../ThematicImage'

describe('CTAThematic', () => {
  describe('Christmas Thematic', () => {
    const thematicName = 'christmas-inspired'

    describe('when after 19th November 2019', () => {
      const wrapper = shallow(<CTAThematic name={thematicName} selectedDate={'2019-11-19T00:00:00+01:00'} />)

      test('shows correct image', () => {
        const image = wrapper.find(ThematicImage)

        expect(image).toHaveLength(1)
        expect(image.prop('imageName')).toEqual('christmas_dinner.jpg')
      })
    })
  })
})
