import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Immutable from 'immutable'
import RangeBadge from 'Recipe/RangeBadge'
import InfoBadge from 'Recipe/InfoBadge'

describe('<RangeBadge />', () => {
  test('should not render by default', () => {
    const wrapper = shallow(<RangeBadge />)

    expect(wrapper.find(InfoBadge).length).toBe(0)
  })

  describe('snapshots', () => {
    test('should render when given a preconfigured range', () => {
      const range = Immutable.fromJS({
        id: '1',
        name: 'Ten to table',
        slug: 'ten-to-table',
        properties: {
          "ribbonColor": "#333D47",
          "borderColor": "#282B2F",
          "textColor": "#FFFFFF"
        }
      })
      const tree = renderer
        .create(<RangeBadge range={range} />)
        .toJSON()

      expect(tree).toMatchSnapshot()

    })
  })

  describe('render', () => {
    test('should render range badge for Ten to table', () => {
      const range = Immutable.fromJS({
        id: '1',
        name: 'Ten to table',
        slug: 'ten-to-table',
        properties: {
          "ribbonColor": "#333D47",
          "borderColor": "#282B2F",
          "textColor": "#FFFFFF"
        }
      })
      const wrapper = shallow(<RangeBadge range={range}/>)
      expect(wrapper.find('.rangeBadge').length).toEqual(1)
    })
    test('should render range badge for Everydays favorites', () => {
      const range = Immutable.fromJS({
        id: '1',
        name: 'everyday favourites',
        slug: 'everyday-favourites',
        properties: {
          "ribbonColor": "#333D47",
          "borderColor": "#282B2F",
          "textColor": "#FFFFFF"
        }
      })
      const wrapper = shallow(<RangeBadge range={range}/>)
      expect(wrapper.find('.rangeBadge').length).toEqual(1)
    })
    test('should render range badge with text Everyday Favorites', () => {
      const range = Immutable.fromJS({
        id: '1',
        name: 'everyday favourites',
        slug: 'everyday-favourites',
        properties: {
          "ribbonColor": "#333D47",
          "borderColor": "#282B2F",
          "textColor": "#FFFFFF"
        }
      })
      const wrapper = shallow(<RangeBadge range={range}/>)
      expect(wrapper.find('.foodBrandName').prop('children')).toEqual('everyday favourites')
    })
    test('should render range badge with text 10-MINUTES MEAL', () => {
      const range = Immutable.fromJS({
        id: '1',
        name: '10-MINUTE MEAL',
        slug: 'ten-to-table',
        properties: {
          "ribbonColor": "#333D47",
          "borderColor": "#282B2F",
          "textColor": "#FFFFFF"
        }
      })
      const wrapper = shallow(<RangeBadge range={range}/>)
      expect(wrapper.find('.foodBrandName').prop('children')).toEqual('10-MINUTE MEAL')
    })
  })
})
