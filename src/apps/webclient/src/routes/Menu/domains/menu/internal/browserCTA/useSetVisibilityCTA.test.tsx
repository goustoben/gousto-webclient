import * as React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'

import { createMockBasketStore } from '../../../basket/internal/testing/createMockBasketStore'
import { useSetBrowserCTAVisibility } from './useSetVisibilityCTA'

describe('setBrowserCTAVisible', () => {
  describe('when called', () => {
    const store = createMockBasketStore({})
    const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

    it('should dispatch a MENU_BROWSE_CTA_VISIBILITY_CHANGE action with TRUE', () => {
      const { result } = renderHook(() => useSetBrowserCTAVisibility(), { wrapper })
      result.current.setBrowserCTAVisible()
      expect(store.dispatch).toHaveBeenCalledWith({
        show: true,
        type: 'MENU_BROWSE_CTA_VISIBILITY_CHANGE',
      })
    })
  })
})

describe('setBrowserCTANonVisible', () => {
  describe('when called', () => {
    const store = createMockBasketStore({})
    const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

    it('should dispatch a MENU_BROWSE_CTA_VISIBILITY_CHANGE action with FALSE', () => {
      const { result } = renderHook(() => useSetBrowserCTAVisibility(), { wrapper })
      result.current.setBrowserCTANonVisible()
      expect(store.dispatch).toHaveBeenCalledWith({
        show: false,
        type: 'MENU_BROWSE_CTA_VISIBILITY_CHANGE',
      })
    })
  })
})
