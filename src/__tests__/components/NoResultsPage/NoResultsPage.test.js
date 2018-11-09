import React from 'react'
import { shallow } from 'enzyme'
import NoResultsPage from 'NoResultsPage'

describe('NoResultsPage', () => {
  let wrapper

  test('render NoResultPage', () => {
    wrapper = shallow(<NoResultsPage imageName={'0-result'} title={'Title'} description={'Description'} />)
    expect(wrapper.find('Svg').render().find('div')).toHaveLength(1)
    expect(wrapper.find('h2').text()).toBe('Title')
    expect(wrapper.find('div.description').text()).toBe('Description')
  })
})
