import React from 'react'

import { render, RenderOptions } from '@testing-library/react'
import { renderHook, RenderHookOptions } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

export const createStore = (state: any) => {
  const mockStore = configureMockStore()

  const store = mockStore(state)

  // eslint-disable-next-line no-undef
  store.dispatch = jest.fn().mockReturnValue(Promise.resolve())

  return store
}

type Store = ReturnType<typeof createStore>

export const renderWithStore = (
  component: React.ReactNode,
  store: Store,
  options?: Omit<RenderOptions, 'queries'>,
) => render(<Provider store={store}>{component}</Provider>, options)

// eslint-disable-next-line no-unused-vars
export const renderHookWithStore = <P, R>(
  callback: (props: P) => R,
  store: Store,
  options?: RenderHookOptions<P>,
) =>
  renderHook(callback, {
    ...(options || {}),
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  })
