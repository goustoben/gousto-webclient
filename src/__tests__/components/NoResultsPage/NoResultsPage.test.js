import React from 'react'
import { mount } from 'enzyme'
import NoResultsPage from 'NoResultsPage'

describe('NoResultsPage', () => {
  let wrapper

  test('render NoResultPage', () => {
    wrapper = mount(<NoResultsPage imageName={'0-result'} title={'Title'} description={'Description'} />)
    expect(wrapper.find('Svg.image').find('div')).toHaveLength(1)
    expect(wrapper.find('h2').text()).toBe('Title')
    expect(wrapper.find('div.description').text()).toBe('Description')
  })
})
