import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import { CommunicationPanel } from '../index'

describe('<CommunicationPanel />', () => {
  const STRING_TITLE = 'Test Title'
  const STRING_BODY = 'Test body text'

  test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <CommunicationPanel level="info" title={STRING_TITLE} body={STRING_BODY} />, div,
    )
  })

  describe('when only required props are passed', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<CommunicationPanel level="info" body={STRING_BODY} />)
    })
    test('should render body text', () => {
      expect(wrapper.find('.panelBody').text()).toEqual(STRING_BODY)
    })

    test('should not have icon', () => {
      expect(wrapper.find('[className^="icon"]')).toHaveLength(0)
    })
  })

  describe('when showIcon true', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<CommunicationPanel showIcon level="info" title={STRING_TITLE} body={STRING_BODY} />)
    })

    test('should render icon', () => {
      expect(wrapper.find('[className^="icon"]')).toHaveLength(1)
    })
  })

  describe('when has title', () => {
    let wrapper
    beforeEach(() => {
      wrapper = mount(<CommunicationPanel showIcon={false} level="info" title={STRING_TITLE} body={STRING_BODY} />)
    })
    test('should render title', () => {
      expect(wrapper.find('.panelTitle')).toHaveLength(1)
    })

    test('should have title equal with text sent', () => {
      expect(wrapper.find('.panelTitle').text()).toEqual(STRING_TITLE)
    })
  })
})
