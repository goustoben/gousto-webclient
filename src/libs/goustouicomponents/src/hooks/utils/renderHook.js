import React from 'react'
// eslint-disable-next-line
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

export const renderHook = (hookToTest) => (...args) => {
  const Component = ({ children }) => children(hookToTest(...args))

  let hook
  let wrapper

  act(() => {
    wrapper = mount(
      <Component>
        {(hookValues) => {
          hook = hookValues

          return null
        }}
      </Component>,
    )
  })

  return { wrapper, hook }
}
