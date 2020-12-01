import React from 'react'
import { mount } from 'enzyme'

import { ToastProvider } from '../Toast.logic'

jest.mock('../ToastList.presentation.js', () => ({
  // eslint-disable-next-line
  ToastList: () => <div />,
}))

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(
    <ToastProvider {...props}>
      <div data-testing="mock-child" />
    </ToastProvider>,
  )
}

describe('Given ToastProvider is used', () => {
  beforeEach(() => {
    mountWithProps()
  })

  test('Then children are rendered as expected', () => {
    expect(
      wrapper.find('[data-testing="mock-child"]').exists(),
    ).toBeTruthy()
  })

  test('Then ToastList is rendered', () => {
    expect(wrapper.find('ToastList').exists()).toBeTruthy()
  })
})
