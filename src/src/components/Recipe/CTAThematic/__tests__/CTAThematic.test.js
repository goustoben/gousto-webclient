import React from 'react'
import { shallow } from 'enzyme'
import { CTAThematic } from '../CTAThematic'
import { ThematicImage } from '../ThematicImage'

describe('CTAThematic', () => {
  describe('Taste of Japan', () => {
    const thematicName = 'gousto-x-wagamama'

    describe('when after 1st October 2019 but before 8th October 2019', () => {
      const wrapper = shallow(<CTAThematic name={thematicName} selectedDate={'2019-10-02T00:00:00+01:00'} />)

      test('shows correct image', () => {
        const image = wrapper.find(ThematicImage)

        expect(image).toHaveLength(1)
        expect(image.prop('imageName')).toEqual('toj_yasaiyaki_donburi.jpg')
      })
    })
    
    describe('when after 8th October 2019 but before 15th October 2019', () => {
      const wrapper = shallow(<CTAThematic name={thematicName} selectedDate={'2019-10-09T00:00:00+01:00'} />)

      test('shows correct image', () => {
        const image = wrapper.find(ThematicImage)

        expect(image).toHaveLength(1)
        expect(image.prop('imageName')).toEqual('toj_all4recipes.jpg')
      })
    })

    describe('when after 15th October 2019 but before 22nd October 2019', () => {
      const wrapper = shallow(<CTAThematic name={thematicName} selectedDate={'2019-10-16T00:00:00+01:00'} />)

      test('shows correct image', () => {
        const image = wrapper.find(ThematicImage)

        expect(image).toHaveLength(1)
        expect(image.prop('imageName')).toEqual('toj_ramen_tonkatsu.jpg')
      })
    })

    describe('when after 22nd October 2019 but before 29th October 2019', () => {
      const wrapper = shallow(<CTAThematic name={thematicName} selectedDate={'2019-10-23T00:00:00+01:00'} />)

      test('shows correct image', () => {
        const image = wrapper.find(ThematicImage)

        expect(image).toHaveLength(1)
        expect(image.prop('imageName')).toEqual('toj_yasaiyaki_donburi.jpg')
      })
    })

    describe('when after 29th October 2019', () => {
      const wrapper = shallow(<CTAThematic name={thematicName} selectedDate={'2019-10-30T00:00:00+01:00'} />)

      test('shows correct image', () => {
        const image = wrapper.find(ThematicImage)

        expect(image).toHaveLength(1)
        expect(image.prop('imageName')).toEqual('toj_ramen_donburi.jpg')
      })
    })
  })
})
