import React from 'react'
import { browserHistory } from 'react-router'
import { mount } from 'enzyme'
import { client } from 'config/routes'
import { AutoAcceptCheck } from './AutoAcceptCheck'

const createComplaint = jest.fn()
const loadRefundAmount = jest.fn()
browserHistory.push = jest.fn()

describe('<AutoAcceptCheck />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <AutoAcceptCheck
        createComplaint={createComplaint}
        loadRefundAmount={loadRefundAmount}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('calls loadRefundAmount', () => {
    expect(loadRefundAmount).toHaveBeenCalled()
  })

  test('renders the LoadingWrapper component', () => {
    expect(wrapper.find('LoadingWrapper').exists()).toBe(true)
  })

  describe('when isAutoAccept is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isAutoAccept: true })
    })

    test('dispatch the createComplaint action', () => {
      expect(createComplaint).toHaveBeenCalled()
    })
  })

  describe('when isAutoAccept is false', () => {
    beforeEach(() => {
      wrapper.setProps({ isAutoAccept: false })
    })

    test('redirects to Refund page', () => {
      expect(browserHistory.push)
        .toHaveBeenCalledWith(`${client.getHelp.index}/${client.getHelp.refund}`)
    })
  })
})
